import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../../logo.svg"
import { styled } from "@mui/material/styles"

import { Divider, Menu } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const defaultTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #dbdcdd',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '1px solid #dbdcdd',
        },
      },
    }
  },
});

const CustomizedAppBar = styled(AppBar)`
background-color: #fff;
padding-left : 40px;
padding-right : 40px;
height: 80px
`

const CustomizedToolBar = styled(Toolbar)`
height: 80px;
justify-content: space-between;
`

const LogoButton = styled(Button)`
border-color: #ffffff;
:hover {
  background-color: #ffffff;
}
`

const CustomizedSearchButton = styled(Button)`
height: 50px;
color: #000000;
background-color: #ffffff;
border-radius: 50px;
:hover {
  background-color: #ffffff;
}
padding-left: 20px;
padding-right: 10px;
`

const CustomizedLoginButton = styled(Button)`
height: 50px;
width: 80px;
color: #000000;
background-color: #ffffff;
border-radius: 50px;
:hover {
  background-color: #ffffff;
}
padding-left: 5px;
padding-right: 5px;
justify-content: space-between;
box-shadow: unset;
`

const CustomizedDivider = styled(Divider)`
padding-right: 15px;
`
const CustomizedTypography = styled(Typography)`
padding-left: 15px;
padding-right: 15px;
`

const CustomizedAvatar = styled(Avatar)`
background-color: #000000;
height:32px;
width:32px;
`

const CustomizedSearchIcon = styled(SearchIcon)`
height:20px;
width:20px;
`
const CustomizedMenuIcon = styled(MenuIcon)`
color: #717171;
`

const CustomizedAccountCircleIcon = styled(AccountCircleIcon)`
color: #717171;
`






export default function Main() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <CustomizedAppBar position="sticky" elevation={0}>
        <CustomizedToolBar>
          <LogoButton >
            <img src={logo} alt="website logo" style={{ height: 13, marginBottom: 5 }} />
            <Typography variant="h5" color="black" noWrap fontFamily="sunflower">
              쉼표
            </Typography>
          </LogoButton>
          <CustomizedSearchButton variant="contained">
            <Typography fontFamily='Noto Sans KR' fontWeight="500">
              어디든지
            </Typography>
            <CustomizedDivider orientation="vertical" flexItem />
            <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
              언제든지
            </CustomizedTypography>
            <Divider orientation="vertical" flexItem />
            <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
              게스트 추가
            </CustomizedTypography>
            <CustomizedAvatar>
              <CustomizedSearchIcon />
            </CustomizedAvatar>
          </CustomizedSearchButton>
          <CustomizedLoginButton variant="contained">
            <CustomizedMenuIcon />
            <CustomizedAccountCircleIcon sx={{ height: 35, width: 35 }} />
          </CustomizedLoginButton>
        </CustomizedToolBar>
      </CustomizedAppBar>


      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main >
    </ThemeProvider >
  );
}