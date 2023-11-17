// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import 'styles.css';
// import ScrollTop from 'components/ScrollTop';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <Routes />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
