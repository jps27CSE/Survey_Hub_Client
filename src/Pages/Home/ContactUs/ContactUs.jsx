import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const ContactUs = () => {
  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <form>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                margin="normal"
                name="name"
                required
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                margin="normal"
                name="email"
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                margin="normal"
                name="message"
                multiline
                rows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1">Email: surveyhub@test.com</Typography>
            <Typography variant="body1">Phone: +880 155-456-7890</Typography>
            <Typography variant="body1">Address: Dhaka, Bangladesh</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
