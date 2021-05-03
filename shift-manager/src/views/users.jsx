import React,{useState} from 'react'
import { connect } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import {getUsers} from '../actions/index'
import { OverlayPanel } from 'primereact/overlaypanel';
import axios from 'axios'

function Users (props)  {
    const [userName,setUserName] = useState('')
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [pdid,setPdid] = useState('')
    // Variable which the OverlayPanel refers to in order to render
    var op
    // JSX Function which returns the button on the tool bar
    var leftButtons = (
        <Button label="Add User" className="p-button-secondary" onClick={(e) => op.toggle(e)}/>
    )
    // JSX Function which returns the delete button on each row
    var actionBody = (rowData) => 
        <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => userDelete(rowData)} />

    // Delete User Method    
    var userDelete = (rowData) => {
        axios.post('/deleteuser',rowData).then((res) => {
            console.log(res);
            props.getUsers()
        }).catch((err) => {
            console.log(err);
        })
    }
    // Create User Method
    var userAdd = () => {
        axios.post('/adduser',{username: userName,email: email,pdid: pdid,fullname: fullName}).then((res) => {
            console.log(res);
            props.getUsers()
            op.toggle()
        }).catch((err) => {
            console.log(err);
        })
    }
    
    return (
        <div>
            <OverlayPanel ref={(el) => op = el}>
                    <div className="flex">
                                <div className="p-2"><InputText value={userName} placeholder="User Name" onChange={(e) => setUserName(e.target.value)} /></div>
                                <div className="p-2" ><InputText value={fullName} placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} /></div>
                                <div className="p-2"><InputText value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} /></div>
                                <div className="p-2"><InputText value={pdid} placeholder="PagerDuty ID" onChange={(e) => setPdid(e.target.value)} /></div>
                    </div>
                    <div className="text-center">
                        <Button label="Add" className="p-button-secondary" onClick={userAdd} />
                    </div>
            </OverlayPanel>
            <Toolbar left={leftButtons}></Toolbar>
            <DataTable value={props.users} >
                <Column field="fullname" header="Name"></Column>
                <Column field="username" header="User Name"></Column>
                <Column field="pdid" header="PagerDuty ID"></Column>
                <Column body={actionBody} />
            </DataTable>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.Users
})

const mapDispatchToProps = {
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
