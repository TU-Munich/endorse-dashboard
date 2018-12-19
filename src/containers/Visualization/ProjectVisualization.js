import React, {Component} from 'react';
import VisualizationCharts from '../../components/Dashboard/VisualizationCharts/VisualizationCharts';
import styled from "styled-components";
import VisualizationRadar from "../../components/Dashboard/VisualizationCharts/VisualizationRadar";

const ContainerDiv = styled.div`
    width: 70%;
    height: 50%;
`;



class ProjectVisualization extends Component {
    render() {
        return (
            <ContainerDiv>
                <VisualizationCharts/>
                <VisualizationRadar/>
            </ContainerDiv>
        );
    }
}

export default ProjectVisualization;