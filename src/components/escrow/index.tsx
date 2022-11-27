import React from "react";
import { Box, Card, CardContent, CardHeader, Container, Grid } from "@mui/material";

export const Escrow = () => {
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
        </Grid>
      </Grid>
    </Box>
  );
};
