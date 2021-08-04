import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dialog from './core/managers/Dialog';
import ProductDialog from './core/managers/ProductDialog';

import Routes from "./core/managers/routes";
import { DialogServiceSingelton } from './core/services/DialogService';

import "./styles/app.scss";

const App: React.FC = () => {
  return (
    <div>
      {/* <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel> */}
          <Dialog ref={DialogServiceSingelton.dialogRef} />
          <ProductDialog ref={DialogServiceSingelton.productPopOutRef} />
          <Routes />
        {/* </TabPanel>
        <TabPanel>
          <h2>hello</h2>
        </TabPanel>
      </Tabs> */}
      
    </div>
  );
}

export default App