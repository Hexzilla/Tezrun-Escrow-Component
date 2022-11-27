import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
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
    console.log('balance', balance)
    setBalance(balance);
  }

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
      toast.error('Please connect your wallet');
      return;
    }
    const result = await deposit();
    console.log("startGame", result);
    if (!!result) {
      sendMessage("GameManager", "StartRace");
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Grid mt={6} sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          Total in Escrow
          <Button
            component="a"
            size="medium"
            target="_blank"
            variant="contained"
            onClick={startGame}
          >
            Start Game
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
