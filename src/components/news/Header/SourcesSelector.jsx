import { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Button, Modal, Select, Typography, Dropdown } from "neetoui";
import { find } from "ramda";
import { useTranslation } from "react-i18next";

import { SOURCE_LIST } from "../Constants";

const SourcesSelector = ({ sourcesFilter, updateQueryParams }) => {
  const [showSourcesSelectorModal, setShowSourcesSelectorModal] =
    useState(false);

  const [selectedSource, setSelectedSource] = useState(
    find(source => source.value === sourcesFilter, SOURCE_LIST)
  );

  const {
    Menu,
    MenuItem: { Button: MenuItemButton },
  } = Dropdown;

  const { Header, Body, Footer } = Modal;

  const { t } = useTranslation();

  const handleSourceChange = () => {
    console.log(selectedSource);
    updateQueryParams({ sources: selectedSource?.value });
    setShowSourcesSelectorModal(false);
  };

  return (
    <>
      <Dropdown customTarget={<Button icon={MenuHorizontal} style="text" />}>
        <Menu>
          <MenuItemButton onClick={() => setShowSourcesSelectorModal(true)}>
            {t("news.changeNewsSource")}
          </MenuItemButton>
        </Menu>
      </Dropdown>
      <Modal
        isOpen={showSourcesSelectorModal}
        size="large"
        onClose={() => setShowSourcesSelectorModal(false)}
      >
        <Header>
          <Typography className="font-medium" style="h2">
            {t("news.changeNewsSource")}
          </Typography>
        </Header>
        <Body>
          <Select
            isSearchable={false}
            label={t("news.newsSource")}
            options={SOURCE_LIST}
            strategy="fixed"
            value={selectedSource}
            onChange={selectedOption => setSelectedSource(selectedOption)}
          />
        </Body>
        <Footer className="flex gap-2">
          <Button label={t("buttonLabel.save")} onClick={handleSourceChange} />
          <Button
            label={t("buttonLabel.cancel")}
            onClick={() => setShowSourcesSelectorModal(false)}
          />
        </Footer>
      </Modal>
    </>
  );
};

export default SourcesSelector;
