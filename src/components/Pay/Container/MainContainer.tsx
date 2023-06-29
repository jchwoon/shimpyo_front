import SideContainer from "./SideContainer"
import SideBox from "./SideBox"
import styled from "@emotion/styled"
import { Typography } from "@mui/material";

export default function MainContainer() {
    return (
        <>
            <Container>
                <SideContainer />
                <SideBox />
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: row;
max-width: 1220px;
width:100%;
`