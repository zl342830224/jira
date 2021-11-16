import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader />
      <Main>
        {/* <ProjectListScreen /> */}
        <Router>
          <Routes>
            <Route path={"/"} element={<ProjectListScreen />}></Route>
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            {/* <Navigate to={`/projects`} /> */}
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      ></ProjectModal>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ padding: 0 }} type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <ProjectPopover />
        <span>User</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={logout}>
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"}>Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
