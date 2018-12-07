import React, { Component } from 'react';
import styled from 'styled-components';

const Article = styled.article`
    max-width: 900px;
    margin: auto;
    padding: 15px;
`;

const Title = styled.h3`
	font-style: bold;
    font-size: 25px;
	color: #424242;
	text-align: center;
	margin-top:20px;
	margin-bottom:20px;
	
  text-indent: 40px;
`;

const Sub_Title = styled.h4`
	font-style: bold;
  font-size: 18px;
	color: #424242;
	margin-top:20px;
	
  text-indent: 25px;
`;

const Paragraph = styled.p`
  text-align: justify;		
  text-justify: inter-word;
    
	font-style: normal;
  font-size: 14px;
	color: #424242;
`;


class Contact extends Component {
    render() {

        return (
                <div>
                <Article>
                    <Title>Welcome to Dashboard</Title>
                    <Sub_Title>General Information:</Sub_Title>
                    <Paragraph>
                        Please read these Dashboard information
                        carefully before using dashboard specific functionalities and the ENDORSE
                        Web application operated by MediCare Company.
                    </Paragraph>
                    <Paragraph>
                        As a doctor in our application your access to Dashboard is conditioned on your acceptance of
                        and compliance with Terms and Conditions. These Terms apply to all doctors who access or use this service.
                    </Paragraph>

                    <Sub_Title>Services that you can use in Doctor Dashboard:</Sub_Title>
                    <Paragraph>
                        For customizing profile information, add additional information into your public profile
                        please select "Customize Profile" tab from left side bar.
                        We are highly recommend you to add those information into your profile
                        in order to all patients can see.
                    </Paragraph>
                    <Paragraph>
                        For managing appointments that you have, you can select "Manage Schedule" from left side bar.
                        There you can update dates of appointments you have and may cancel them for an unavailable situation.
                    </Paragraph>
                </Article>
            </div>
        );
    }
}

export default Contact;