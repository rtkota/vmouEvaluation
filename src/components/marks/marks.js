import React from 'react';
import classes from './marks.module.css'
import {Button} from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next'; 
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

const marks = (props) => {
  
  
    let markdata = props.data;
    
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
              if (newValue > 70) {
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
            editor: {
                type: Type.SELECT,
                options: [{
                  value: ' ',
                  label: ' '
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
      
        <div className={classes.Marks} style={{ marginTop: 50 }}>
            <BootstrapTable 
                keyField="controlno" 
                data={markdata} 
                columns={columns} 
                striped={true}
                cellEdit={ cellEditFactory({ mode: 'click',autoSelectText: true, blurToSave: false })}
            />
            <Button onClick={props.entrySaved}>Save</Button>
            <Button onClick={props.entryCancelled}>Cancel</Button>
            <Button onClick={props.entrySubmit}>Submit</Button>
        </div>
    )
}

export default marks;