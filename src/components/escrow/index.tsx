import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook";
import { getEscrowBalance } from "services";
import { useEscrow } from "hooks/useEscrow";
import useBeacon from "hooks/useBeacon";

type EscrowProps = {
  unityContext: UnityContextHook;
};

export const Escrow = ({ unityContext }: EscrowProps) => {
  const { address } = useBeacon();
  const { deposit } = useEscrow();
  const { sendMessage, addEventListener, removeEventListener } = unityContext;
  const [balance, setBalance] = useState(0);

  const onRaceWon = (param) => {
    console.log("RaceWon", param);
  };

  const onRaceLost = (param) => {
    console.log("RaceLost", param);
  };

  const getEscrow = async () => {
    const balance = await getEscrowBalance();
    console.log("balance", balance);
    setBalance(balance);
  };

  useEffect(() => {
    getEscrow();

    addEventListener("RaceWon", onRaceWon);
    addEventListener("RaceLost", onRaceLost);
    return () => {
      removeEventListener("RaceWon", onRaceWon);
      removeEventListener("RaceLost", onRaceLost);
    };
  }, []);

  const startGame = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    //const result = await deposit();
    //console.log("startGame", result);
    //if (!!result) {
    sendMessage("GameManager", "StartRace");
    //}
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item md={6} xs={12}></Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    color="primary.main"
                    variant="h3"
                  >
                    Total in Escrow {balance}
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="h6">
                  You need at lest 1 tez to play game
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button size="small" variant="outlined" onClick={startGame}>
                  Start Game
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
