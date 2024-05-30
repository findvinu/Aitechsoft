import { Card, CardContent, Typography } from "@mui/material";
import { ButtonComponent as Button } from "../../components/";
import styles from "./Card.module.css";

const CardComponent = ({ heading, content, btnText }) => {
  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h5">{heading}</Typography>
        <Typography variant="body2">{content}</Typography>
        <Button variant="contained" style={{ marginTop: "10px" }}>
          {btnText ? btnText : "Learn More"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
