import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import Details from "./components/Details";
function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#001529" }}>
        <div style={{ color: "white", fontSize: "20px" }}>Home Metrics</div>
        {/* Optional menu */}
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Table</Menu.Item>
          <Menu.Item key="2">Charts</Menu.Item>
        </Menu> */}
      </Header>

      <Content style={{ padding: "24px" }}>
        <Details />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        My App ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </Layout>
  );
}

export default App;
