
import { Table, Input, Button } from 'antd';
import 'antd/dist/antd.css';

import React, { Component } from "react";
import ReactDOM from "react-dom";

const API_URL = "http://localhost:3000"

const columns = [
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Skillsets',
    dataIndex: 'skillsets',
    key: 'skillsets',
  },
  {
    title: 'Hobby',
    dataIndex: 'hobby',
    key: 'hobby'
  }
];


class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      data:[],
      formOpened: false,
      formItem:{}
    };
    this.openForm= this.openForm.bind(this);
    this.closeForm= this.closeForm.bind(this);
    this.changeValue=this.changeValue.bind(this);
    this.submitData=this.submitData.bind(this);
    this.deleteUser=this.deleteUser.bind(this)
  }

  componentDidMount(prevProps){
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    };
    fetch(API_URL+"/api/userCDNs", options).then((response)=>{
      return response.json()
    }).then((data)=>{
      if(data.length>0){
        this.setState({data})
      }
    })
  }

  openForm(record){
    this.setState({formOpened:true, formItem:record})
  }
  closeForm(){
    this.setState({formOpened:false, formItem:{}})
  }

  changeValue(field, value){
    this.setState({formItem: Object.assign({}, this.state.formItem, {[field]:value})})
  }

  deleteUser(){
    let options = {
      method: 'DELETE',
      body: JSON.stringify(this.state.formItem),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch(API_URL+"/api/userCDNs/"+this.state.formItem.id, options).then((response)=>{
      return response.json()
    }).then((data)=>{
      let optionsFetch = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      };
      fetch(API_URL+"/api/userCDNs", optionsFetch).then((response)=>{
        return response.json()
      }).then((data)=>{
        this.setState({data, formOpened:false, formItem:{}})
      })
    })
  }

  submitData(){
    if(this.state.formItem.id=="new"){
      let itemClone = JSON.parse(JSON.stringify(this.state.formItem))
      delete itemClone.id
      let options = {
        method: 'POST',
        body: JSON.stringify(itemClone),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch(API_URL+"/api/userCDNs", options).then((response)=>{
        return response.json()
      }).then((data)=>{
        let optionsFetch = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'GET'
        };
        fetch(API_URL+"/api/userCDNs", optionsFetch).then((response)=>{
          return response.json()
        }).then((data)=>{
          if(data.length>0){
            this.setState({data, formOpened:false, formItem:{}})
          }
        })
      })
    }
    else if(this.state.formItem.id) {
      let options = {
        method: 'PATCH',
        body: JSON.stringify(this.state.formItem),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch(API_URL+"/api/userCDNs/"+this.state.formItem.id, options).then((response)=>{
        return response.json()
      }).then((data)=>{
        let optionsFetch = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'GET'
        };
        fetch(API_URL+"/api/userCDNs", optionsFetch).then((response)=>{
          return response.json()
        }).then((data)=>{
          if(data.length>0){
            this.setState({data, formOpened:false, formItem:{}})
          }
        })
      })
    }
  }

  render() {
    return (
      <React.Fragment>
      <div className="add-user-button-parent">
        <Button onClick={()=>{this.openForm({id:"new"})}} type="primary">Add User</Button>
      </div>
      <div className="table-parent">
        <Table
          dataSource={this.state.data}
          columns={columns}
          onRow={(record, rowIndex)=> {
            return {
              onClick: event => {this.openForm(record)}, // click row
            };
          }}
        />
      </div>
      <div className="form" style={{display:this.state.formOpened?"block":"none"}}>
        <div className="form-header">
          <h1>{this.state.formItem&&this.state.formItem.id!="new"?"Editing user":"Creating user"}</h1>
          <h4 className="form-close" onClick={this.closeForm}>X</h4>
        </div>

        <div className="input-parent">
          <div className="ant-col ant-col-6 ant-form-item-label">
            <label>Username</label>
          </div>
          <Input onChange={(e)=>{this.changeValue("username", e.target.value)}} value={this.state.formItem&&this.state.formItem.username?this.state.formItem.username:""}></Input>
        </div>
        <div className="input-parent">
          <div className="ant-col ant-col-6 ant-form-item-label">
            <label>Email</label>
          </div>
          <Input onChange={(e)=>{this.changeValue("email", e.target.value)}} value={this.state.formItem&&this.state.formItem.email?this.state.formItem.email:""}></Input>
        </div>
        <div className="input-parent">
          <div className="ant-col ant-col-6 ant-form-item-label">
            <label>Phone Number</label>
          </div>
          <Input onChange={(e)=>{this.changeValue("phoneNumber", e.target.value)}} value={this.state.formItem&&this.state.formItem.phoneNumber?this.state.formItem.phoneNumber:""}></Input>
        </div>
        <div className="input-parent">
          <div className="ant-col ant-col-6 ant-form-item-label">
            <label>Skillsets</label>
          </div>
          <Input onChange={(e)=>{this.changeValue("skillsets", e.target.value)}} value={this.state.formItem&&this.state.formItem.skillsets?this.state.formItem.skillsets:""}></Input>
        </div>
        <div className="input-parent">
          <div className="ant-col ant-col-6 ant-form-item-label">
            <label>Hobby</label>
          </div>
          <Input onChange={(e)=>{this.changeValue("hobby", e.target.value)}} value={this.state.formItem.hobby&&this.state.formItem.hobby?this.state.formItem.hobby:""}></Input>
        </div>
        <div className="submit-button-parent">
          {this.state.formItem.id!="new"
          ?
          (<Button onClick={this.deleteUser} type="danger">Delete</Button>)
          :
          (<div style={{display:"none"}}></div>)
          }
          <Button onClick={this.submitData} type="primary">Submit</Button>
        </div>
      </div>
      </React.Fragment>
    );
  }
}
export default FormContainer;
