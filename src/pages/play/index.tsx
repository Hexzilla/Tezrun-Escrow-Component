import React, { useEffect } from "react";
import { useDispatch/*, useSelector*/ } from "react-redux";
import toast from "react-hot-toast";
import { Box, Card, CardContent, Container } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
//import { RootState } from "store";
import { MainLayout } from "components/main-layout";
//import TezosBoard from "components/play/playtime-tezos";
import { Escrow } from "components/escrow";

const unityConfig = {
  loaderUrl: "Build/public.loader.js",
  dataUrl: "Build/public.data.unityweb",
  frameworkUrl: "Build/public.framework.js.unityweb",
  codeUrl: "Build/public.wasm.unityweb",
};

const Play = () => {
  const dispatch = useDispatch();
  const unityContext = useUnityContext(unityConfig);
  //const { connected } = useSelector((state: RootState) => state.play);

  return (
    <MainLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                minHeight: "540px",
              }}
            >
              <Unity
                unityProvider={unityContext.unityProvider}
                style={{
                  height: 540,
                  width: 950,
                  background: "#555",
                }}
              />
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            {/* <TezosBoard socket={socket} /> */}
            <Escrow unityContext={unityContext}></Escrow>
          </Card>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Play;
