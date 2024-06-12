import {
  Button,
  Textarea,
  TextareaOnChangeData,
  Title1,
  Title2,
} from "@fluentui/react-components";
import { ChangeEvent, useCallback, useState } from "react";

import { stopBookmarksRedux } from "../../models/etaObjects.js";
import { editBookmarkDb } from "../../store/bookmarks/slice.js";
import { useAppDispatch, useAppSelector } from "../../store/index.js";
import style from "./Transfer.module.css";

export default function Transfer() {
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state: { stopBookmarks: stopBookmarksRedux }) => state.stopBookmarks
  );
  const dispatch = useAppDispatch();

  const text = JSON.stringify(stopBookmarks);

  const [value, setValue] = useState(text);

  const onReset = useCallback(() => {
    setValue(text);
  }, [text]);

  const onChange = useCallback(
    (_ev: ChangeEvent<HTMLTextAreaElement>, data: TextareaOnChangeData) => {
      setValue(data.value);
    },
    []
  );
  const handleApply = useCallback(() => {
    const test = safeJsonParse<stopBookmarksRedux>(value);
    if (test) dispatch(editBookmarkDb(test.entities));
  }, [value]);

  function safeJsonParse<T>(str: string) {
    try {
      const jsonValue: T = JSON.parse(str);

      return jsonValue;
    } catch {
      return undefined;
    }
  }

  return (
    <main className={style.transfer}>
      <Title1>Transfer Bookmark</Title1>
      <div className="export">
        <Title2>Current Bookmark</Title2>
        <p>
          Copy the content in the textbox below, to transfer bookmarks to new
          devices / browsers.
        </p>
        <Textarea className={style["export-textarea"]} value={text} disabled />
      </div>
      <div className="import">
        <Title2>Import Bookmark</Title2>
        <p>Paste copied content here to get your saved bookmarks.</p>
        <p>
          <strong>WARNING</strong>: Might lead to app become unusable, use with
          caution.
        </p>
        <form className={style["import-form"]}>
          <Textarea
            className={style["export-textarea"]}
            value={value}
            onChange={onChange}
          />
          <div className={style["action-buttons"]}>
            <Button type="submit" appearance="primary" onClick={handleApply}>
              Apply
            </Button>
            <Button onClick={onReset} appearance="secondary">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
