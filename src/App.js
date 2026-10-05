import "./App.css"
import logo from "./logo.svg"
import add from "./add.png"
import sub from "./sub.png"
import mul from "./mul.png"
import div from "./div.png"

import { Grid, Button, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
    typography: {
        fontFamily: `'Pangolin', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
    }
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="App-header">
                    <img src={logo} alt="logo" style={{ maxHeight: "90px" }} />
                    <Typography variant="h1">MATH BUDDY</Typography>
                </div>
                <div className="App-body">
                    <Button>
                        <img
                            src={add}
                            alt="add"
                            style={{ maxHeight: "60px" }}
                        />
                        <Typography variant="h2" sx={{ color: "#02afff" }}>
                            Addition
                        </Typography>
                    </Button>
                    <Button>
                        <img
                            src={sub}
                            alt="sub"
                            style={{ maxHeight: "60px" }}
                        />
                        <Typography variant="h2" sx={{ color: "#00be5f" }}>
                            Subtraction
                        </Typography>
                    </Button>
                    <Button>
                        <img
                            src={mul}
                            alt="mul"
                            style={{ maxHeight: "60px" }}
                        />
                        <Typography variant="h2" sx={{ color: "#c447dd" }}>
                            Multiplication
                        </Typography>
                    </Button>
                    <Button>
                        <img
                            src={div}
                            alt="div"
                            style={{ maxHeight: "60px" }}
                        />
                        <Typography variant="h2" sx={{ color: "#ff745b" }}>
                            Division
                        </Typography>
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default App
