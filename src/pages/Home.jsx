import EditableDataGrid from "./products/EditableDataGrid";
import EditablePopupDataGrid from "./products/EditablePopupDataGrid";
import EditRowComponent from "./products/EditRowComponent";
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { CardComponent as Card } from "../components/";

import styles from "./Home.module.css";

const cardData = [
  { heading: "Card 1", content: "This is a description for card 1." },
  { heading: "Card 2", content: "This is a description for card 2." },
  { heading: "Card 3", content: "This is a description for card 3." },
  { heading: "Card 4", content: "This is a description for card 4." },
];
const Home = () => {
  return (
    <>
      {/* <EditableDataGrid /> */}
      {/*  <EditablePopupDataGrid /> */}
      {/*  <EditRowComponent /> */}

      <Container className={styles.container} maxWidth="xl">
        <header className={styles.header}>
          <Typography variant="h4">My Responsive App</Typography>
        </header>
        <Grid container spacing={2} className={styles.grid}>
          {cardData &&
            cardData.map((card, inx) => {
              return (
                <Grid item xs={12} sm={6} md={3} lg={2} xl={3} key={inx}>
                  <Card heading={card.heading} content={card.content} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
