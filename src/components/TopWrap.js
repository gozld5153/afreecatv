import React from "react";

export default function TopWrap({ handleSortList, handleAfresh, change }) {
  return (
    <div className="title-wrap">
      <h2 className="big">전체</h2>
      <div className="rt_group">
        <select
          onClick={(e) => handleSortList(e.target.value)}
          defaultValue={change}
        >
          <option value="최신순">최신순</option>
          <option value="시청자순">시청자순</option>
        </select>

        <button
          onClick={handleAfresh}
          type="button"
          id="all_btn_reload"
          className="reload"
        >
          <span>새로고침</span>
        </button>
      </div>
    </div>
  );
}
