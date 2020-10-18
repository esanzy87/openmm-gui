import React from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

const Home = () => {
  const classes = useStyles({});
  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => setOpen(false);
  // const handleClick = () => setOpen(true);
  const handleClickNewSimulation = () => {
    const { ipcRenderer } = require('electron');
    ipcRenderer.send('open-file-explorer', '');
  }


  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
      <div className={classes.root}>
        {/*
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        */}
        <Typography variant="h4" gutterBottom>
          OpenMM GUI
        </Typography>
        <Typography gutterBottom>        
          <Button variant="contained" color="primary" onClick={handleClickNewSimulation}>
            New Simulation
          </Button>
        </Typography>
        
        {/*
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          with Nextron
        </Typography>
        <img src="/images/logo.png" />
        <Typography gutterBottom>
          <Link href="/next">Go to the next page</Link>
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Super Secret Password
        </Button>
        */}
      </div>
    </React.Fragment>
  );
};

Home.getInitialProps = async (ctx) => {
  // const { spawn } = require('child_process');
  
  // const spawnPromise = () => new Promise((resolve, reject) => {
  //   const pythonProcess = spawn('/Users/junwon/opt/anaconda3/bin/python', ['./main/hello.py']);
  //   pythonProcess.stdout.on('data', function (data) {
  //     resolve(data.toString());
  //   });
  // });
  // const data = await spawnPromise();
  // console.log(data);
  // return { data };
  return {};
}

export default Home;
