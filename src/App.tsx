import MainRoutes from './routes/mainRoutes';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <div>
      <Layout>
        <MainRoutes />
      </Layout>
    </div>
  );
}

export default App;
