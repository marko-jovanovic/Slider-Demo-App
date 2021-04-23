import Link from 'next/link';
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import CollectionsIcon from '@material-ui/icons/Collections';
import styles from './Navbar.module.scss'

function Navbar() {
  return (
    <AppBar className={styles['app-navigation']} position="static">
      <Toolbar className='toolbar'>
        <Link href='/'>
          <a className={styles.brand}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <CollectionsIcon />
            </IconButton>
            <Typography variant="h6">
              Slider App
            </Typography>
          </a>
        </Link>

        <div className={styles.actions}>
          <Button color="inherit">
            <Link href='/settings'>
              <a>Settings</a>
            </Link>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
