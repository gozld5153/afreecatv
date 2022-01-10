import React from "react";

export default function BoardList({ list }) {
  return (
    <li className="cBox">
      <div className="thumbs-box">
        <a
          href={`https://play.afreecatv.com/${list.user_id}/${list.broad_cate_no}`}
          target="_blank"
        >
          <img src={list.broad_thumb} />
        </a>
        {list.visit_broad_type === "0" ? (
          <>
            <span className="allow visible">탐방허용</span>
            <span className="time visible">{list.broad_start} 방송시작</span>
            <button
              type="button"
              className="btn-later visible"
              tip="나중에 보기"
            >
              <span>나중에 보기</span>
            </button>
          </>
        ) : null}
      </div>

      <div className="cBox-info">
        <a
          className="thumb"
          href={`https://bj.afreecatv.com/${list.user_id}`}
          target="_blank"
        >
          <img alt="" src={list.profile_img} />
        </a>
        <div>
          <a
            href={`https://play.afreecatv.com/${list.user_id}/${list.broad_cate_no}`}
            className="title"
            title={list.broad_title}
          >
            {list.broad_title}
          </a>
        </div>
        <div className="details">
          <a
            href={`https://bj.afreecatv.com/${list.user_id}`}
            className="nick"
            target="_blank"
          >
            <span>{list.user_nick}</span>
          </a>
          <span className="views">
            <span>{list.total_view_cnt}</span>
          </span>
        </div>
      </div>
    </li>
  );
}
