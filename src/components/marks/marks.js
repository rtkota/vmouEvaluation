import React from 'react';
import classes from './marks.module.css'
import {Button} from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next'; 
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';

const marks = (props) => {
  
  
    let markdata = props.data.marks;
    
    const columns = [
        {
            dataField:'controlno',
            text:'Control No',
            editable:false
        },
        {
            dataField:'award',
            text:'Marks Obtained',
            validator: (newValue, row, column) => {
              if (isNaN(newValue) || newValue === '') {
                return {
                  valid: false,
                  message: 'Awards should be numeric'
                };
              }
              if (newValue > props.data.mmarks) {
                return {
                  valid: false,
                  message: 'Award cannot exceed Max Marks'
                };
              }
              return true;
            }
        },
        {
            dataField:'status',
            text:'Status',
            validator: (newValue, row, column) => {
              if (newValue === '') {
                return {
                  valid: false,
                  message: 'Select From Dropdown'
                };
              }},
              editor: {
                type: Type.SELECT,
                default:'  ',
                options: [{
                  value: '  ',
                  label: '  '
                }, {
                  value: 'Ab',
                  label: 'Ab'
                }, {
                  value: 'ZE',
                  label: 'ZE'
                }, {
                  value: 'UM',
                  label: 'UM'
                }]
              }
        }
    ];
    //
    return (
      
        <div className={classes.Marks} style={{ marginTop: 10 }}>
            <div className={classes.Heading}>
              <p>Exam: {props.data.exam}</p>
              <p>Program: {props.data.pcode}</p>
              <p>Course: {props.data.ccode}</p>
              <p>Type: {props.data.ptype}</p>
              <p>Max.Marks: {props.data.mmarks}</p>
            </div>
            <BootstrapTable 
                keyField="controlno" 
                data={markdata} 
                columns={columns} 
                striped={true}
                condensed
                tabIndexCell
                pagination={
                  paginationFactory() }
                cellEdit={ cellEditFactory({ mode: 'click',autoSelectText: true, blurToSave: true })}
            />
            <Button onClick={props.entrySaved}>Save</Button>
            <Button onClick={props.entryCancelled}>Cancel</Button>
            <Button onClick={props.entrySubmit}>Submit</Button>
        </div>
    )
}

export default marks;