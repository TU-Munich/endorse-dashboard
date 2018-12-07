import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import { Formik, Form, Field, FieldArray } from "formik";


const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  margin: 10px; 
   
  text-align: center;
  margin-top:20px;
  max-width: 90%;	
`;

const UploadContainer = styled.div`
 
   padding: 10px 8px 0px 8px;
   text-align: center;
`;

const StyledForm =styled.form`
    margin:20px;
`;

const StyledInputField = styled(Field)`
    margin:3px;
    border-radius:5px;
    border-style:ridge; 
    height:28px; 
    width:30%;
    `;

const StyledButton = styled.button`
    height:28px;
    width:5%;
    border-radius:5px;
`;

class UploadFiles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
        this.clickState = this.clickState.bind(this);
        // this.selectFolder = this.selectFolder.bind(this);
    }
    clickState() {
        this.setState({data: 'Test'});
        console.log(this.state.files);
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <ContainerDiv>
                <Card style={{height:"300%", padding:"10px 10px 10px"}}>
                    <h1>Local File Processing</h1>
                    <p>Please select the location of the files you want to fetch into the processing system.</p>
                    <UploadContainer >
                            <Formik
                                initialValues={{ folders: [""] }}
                                onSubmit={values =>
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                    }, 500)
                                }
                            render={({ values }) => (
                                <Form >
                                    <FieldArray
                                        name="folders"
                                        render={arrayHelpers => (
                                            <div>
                                                {values.folders && values.folders.length > 0 ? (
                                                    values.folders.map((folder, index) => (
                                                        <div key={index} style={{margin:"5px"}}>
                                                            <StyledInputField
                                                                name={`folders.${index}`}
                                                                />
                                                            <StyledButton
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)} // remove folder
                                                            >
                                                                -
                                                            </StyledButton>
                                                            <StyledButton
                                                                type="button"
                                                                onClick={() => arrayHelpers.insert(index, "")} // insert an empty string
                                                            >
                                                                +
                                                            </StyledButton>
                                                        </div>

                                                    ))
                                                ) : (
                                                    <button type="button" onClick={() => arrayHelpers.push("")}>
                                                        {/* show this when user has removed all friends from the list */}
                                                    </button>
                                                )}
                                                <div>
                                                    <button type="submit">Submit</button>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </Form>
                            )}
                        />
                       </UploadContainer>
                </Card>
            </ContainerDiv>
        );
    }
}

export default UploadFiles;
