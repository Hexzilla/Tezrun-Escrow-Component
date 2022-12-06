import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Card, CardContent, Container } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
import { MainLayout } from "components/main-layout";
import { Escrow } from "components/escrow";
import { RootState } from "store";
import Loader from "components/loader";
import "./styles.css";
import useInterval from "hooks/useInterval";

const unityConfig = {
  loaderUrl: "Build/public.loader.js",
  dataUrl: "Build/public.data.unityweb",
  frameworkUrl: "Build/public.framework.js.unityweb",
  codeUrl: "Build/public.wasm.unityweb",
};

const Play = () => {
  const { loading } = useSelector((state: RootState) => state.play);
  const unityContext = useUnityContext(unityConfig);
  const { loadingProgression, isLoaded } = unityContext;
  const [loadingPercent, setLoadingPercent] = useState(0);

  useInterval(() => {
    if (loadingProgression >= 1) {
      setLoadingPercent(1);
    } else if (loadingPercent < loadingProgression) {
      setLoadingPercent(loadingPercent + 0.01);
    }
  }, 20);

  return (
    <MainLayout>
      {loading && <Loader />}
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
                position: "relative",
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
              {!isLoaded && loadingProgression > 0 && (
                <div className="unity-loader">
                  <div>{Math.floor(100 * loadingPercent)}</div>
                  <div>Loading</div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <Escrow unityContext={unityContext}></Escrow>
          </Card>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Play;
