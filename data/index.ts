import { FileNode, Message } from '@/interfaces';

export const fileTree: FileNode[] = [
      {
        
          "name": "RimanakuyInterface",
          "path": ".",
          "children": [
              {
                  "name": ".eslintrc",
        "content" : `Bar`
    
              },
              {
                  "name": "index.html",
                  "content" : `

                  `
              },
              {
                  "name": "vite.config.js",
                  "content" : ""
              },
              {
                  "name": "README.md",
                  "content" : ""
              },
              {
                  "name": ".gitignore",
                  "content" : ""
              },
              {
                  "name": "content",
                  "content": ""
              }
          ],
          "folders": [
              "src",
              "public"
          ]
      },
      {
          "name": "src",
          "path": "src",
          "children": [
              {
                  "name": "main.jsx",
                  "content" : ``
                  
              },
              {
                  "name": "theme.js",
                  "content" : ""
              },
              {
                  "name": "App.jsx",
                  "content" : ""
              },
              {
                  "name": "index.css",
                  "content" : ""
              },
              {
                  "name": "App.css",
                  "content" : ""
              }
          ],
          "folders": [
              "pages",
              "assets",
              "services",
              "components"
          ]
      },
      {
          "name": "pages",
          "path": "src/pages",
          "children": [
              {
                  "name": "Home.jsx",
                  "content" : `
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;`
              }
          ],
          "folders": []
      },
      {
          "name": "assets",
          "path": "src/assets",
          "children": [
              {
                  "name": "Logo.jsx",
                  "content" : ""
              },
              {
                  "name": "spain.png",
                  "content" : ""
              },
              {
                  "name": "Languages.jsx",
                  "content" : "const Bar = () => {"
              },
              {
                  "name": "image 2.png",
                  "content" : ""
              },
              {
                  "name": "react.svg",
                  "content" : ""
              }
          ],
          "folders": []
      },
      {
          "name": "services",
          "path": "src/services",
          "children": [
              {
                  "name": "config.js",
                  "content" : "const Bar = () => {"
              },
              {
                  "name": "model.service.js",
                  "content" : ""
              }
          ],
          "folders": []
      },
      {
          "name": "components",
          "path": "src/components",
          "children": [
              {
                  "name": "BoxLanguages.jsx",
                  "content" : ""
              },
              {
                  "name": "TextBoxTranslate.jsx",
                  "content" : ""
              },
              {
                  "name": "Spinner.jsx",
                  "content" : ""
              },
              {
                  "name": "Language.jsx",
                  "content" : ""
              }
          ],
          "folders": []
      },
      {
          "name": "public",
          "path": "public",
          "children": [
              {
                  "name": "_redirects",
                  "content" : ""
              },
              {
                  "name": "vite.svg",
                  "content" : ""
              },
              {
                  "name": "prueba.xlsx",
                  "content" : ""
              },
              {
                  "name": "loaderio-ad27ec2fa47edb3a4f25434a1db097e7.txt",
                  "content" : `
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
`
              }
          ],
          "folders": []
      }
  ]






  const text = `
const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};
}

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              {/* <Route path="/geography" element={<Geography />} />*/}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}content here
}
`;