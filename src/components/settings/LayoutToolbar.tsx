import {
  Toolbar,
  ToolbarRadioButton,
  ToolbarRadioGroup,
} from "@fluentui/react-components";
import { ArrowSplit20Regular, Merge20Regular } from "@fluentui/react-icons";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/index.js";
import { changeSettings } from "../../store/settings/slice.js";

export default function LayoutToolbar() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const unifiedEtaValue = useAppSelector(
    (state) => state.settings?.entities?.unifiedEta?.value === "true"
  );

  const handleUnifiedEtaChange = useCallback(
    (_, data) => {
      const value = data.checkedItems[0];
      dispatch(
        changeSettings({
          id: "unifiedEta",
          name: "unifiedEta",
          value: (value === "true").toString(),
        })
      );
    },
    [dispatch]
  );
  return (
    <Toolbar
      defaultCheckedValues={{
        listStyle: [unifiedEtaValue.toString()],
      }}
      onCheckedValueChange={handleUnifiedEtaChange}
    >
      <ToolbarRadioGroup>
        <ToolbarRadioButton
          aria-label={t("settings.singleList")}
          name="listStyle"
          value="true"
          icon={<Merge20Regular />}
        />
        <ToolbarRadioButton
          aria-label={t("settings.separateLines")}
          name="listStyle"
          value="false"
          icon={<ArrowSplit20Regular />}
        />
      </ToolbarRadioGroup>
    </Toolbar>
  );
}
