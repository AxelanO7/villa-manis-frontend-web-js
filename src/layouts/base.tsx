import React, { useState } from "react";
import Footer from "./footer";

interface BaseLayoutProps {
  children: React.ReactNode;
  withNavbar?: boolean;
  withSidebar?: boolean;
}

export default function BaseLayout({
  children,
  withNavbar = true,
  withSidebar = true,
}: BaseLayoutProps) {
  const [navSidebar, setNavSidebar] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleNavSidebar = () => {
    setNavSidebar(!navSidebar);
  };

  const handleMainPage = () => {
    window.location.href = "/main-page";
  };

  const handleReportPage = () => {
    window.location.href = "/cash-flow";
  };

  const handleIncomePage = () => {
    window.location.href = "/income";
  };

  const handleExpenditurePage = () => {
    window.location.href = "/expenditure";
  };

  const handleCashFlowPage = () => {
    window.location.href = "/cash-flow";
  };

  const handleReportJournalPage = () => {
    window.location.href = "/report-journal";
  };

  const handleBalanceSheetPage = () => {
    window.location.href = "/balance-sheet";
  };

  const handleIncomeStatementPage = () => {
    window.location.href = "/profit-loss";
  };

  const handleStatementOfOwnerEquityPage = () => {
    window.location.href = "/capital-change";
  };

  const handleCOA = () => {
    window.location.href = "/account";
  };

  const handleCategory = () => {
    window.location.href = "/category";
  };

  const handleUser = () => {
    window.location.href = "/user";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex w-full">
        {/* {withSidebar && <Sidebar />} */}
        <div className="grow">
          {withNavbar && (
            <div className="flex flex-col fixed top z-[1] w-full bg-slate-100">
              <nav className="flex p-2 items-center">
                {navSidebar ? (
                  <div className="w-64" />
                ) : (
                  <div className="w-16" />
                )}
                <div
                  className="bg-success p-2 rounded"
                  onClick={handleNavSidebar}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-4" />
                <input
                  placeholder="Search for something..."
                  className="bg-transparent"
                />
                <div className="grow" />
                <div className="flex" onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="gray"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="w-4" />
                  <p className="text-gray-500">Log Out</p>
                  <div className="w-4" />
                </div>
              </nav>

              {navSidebar ? (
                <div className="bg-blue-950 h-screen fixed left z-[2] px-6 space-y-6 pt-4 w-min">
                  <div className="flex items-center justify-center w-full">
                    <svg width={103} height={73}>
                      <defs>
                        <clipPath id="a">
                          <path d="M43.504 2.293h16.422V41.68H43.504Zm0 0" />
                        </clipPath>
                        <clipPath id="b">
                          <path d="M.129 55.652h13.723V70.57H.129Zm0 0" />
                        </clipPath>
                        <clipPath id="c">
                          <path d="M15.324 55.164H17V70.57h-1.676Zm0 0" />
                        </clipPath>
                        <clipPath id="d">
                          <path d="M19.734 55.164h4.41V70.57h-4.41Zm0 0" />
                        </clipPath>
                        <clipPath id="e">
                          <path d="M25.371 55.164h4.164V70.57h-4.164Zm0 0" />
                        </clipPath>
                        <clipPath id="f">
                          <path d="M30 59.332h9.828V70.57H30Zm0 0" />
                        </clipPath>
                        <clipPath id="g">
                          <path d="M47.426 55.652h14.949V70.57h-14.95Zm0 0" />
                        </clipPath>
                        <clipPath id="h">
                          <path d="M64.336 59.332H74.87V70.57H64.336Zm0 0" />
                        </clipPath>
                        <clipPath id="i">
                          <path d="M76.832 59.332h10.047V70.57H76.832Zm0 0" />
                        </clipPath>
                        <clipPath id="j">
                          <path d="M89.086 55.164h2.695V70.57h-2.695Zm0 0" />
                        </clipPath>
                        <clipPath id="k">
                          <path d="M93.25 59.332h9.438V70.57H93.25Zm0 0" />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#a)">
                        <path
                          d="M51.605 41.582c.18-3.223.95-12.434 4.067-18.809 1.226-2.496 2.594-4.527 4.016-6.18-1.004-9.398-6.91-13.57-7.958-14.241 0 0-.03-.082-.082-.051-.05-.031-.082.05-.082.05-1.05.672-6.988 4.868-7.964 14.329 1.394 1.64 2.738 3.64 3.937 6.093 3.121 6.375 3.89 15.586 4.066 18.809Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#f3df92",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <path
                        d="M61.121 23.91c-.996 6.746-5.27 14.422-7.094 17.457 2.223-2.832 7.813-9.484 13.7-12.8 2.421-1.364 4.699-2.262 6.808-2.817 4.496-8.316 1.992-15.098 1.508-16.246 0 0 .023-.086-.04-.09-.023-.055-.093-.004-.093-.004-1.242-.039-8.445.047-14.59 7.184.23 2.156.203 4.586-.199 7.316ZM90.7 30.879c.01-.059-.075-.055-.075-.055-1-.742-6.984-4.75-16.09-2.351-1.031 1.906-2.43 3.894-4.308 5.914-5.383 5.793-15.118 10.12-16.891 10.879l-.078.062c1.89.379 12.363 2.332 20.082.61 14.418-3.215 17.035-13.465 17.344-14.965 0 0 .066-.055.015-.094ZM49.285 41.57c-1.61-2.625-6.328-10.8-7.383-17.933-.398-2.692-.425-5.094-.207-7.227-6.16-7.223-13.418-7.312-14.664-7.273 0 0-.07-.051-.093.004-.063.004-.04.09-.04.09-.484 1.148-2.988 7.93 1.508 16.246 2.11.554 4.387 1.453 6.809 2.816 6.246 3.52 12.16 10.8 14.07 13.277Zm.594 3.696c-1.774-.758-11.508-5.086-16.89-10.88-1.88-2.019-3.278-4.007-4.31-5.913-9.105-2.399-15.09 1.609-16.09 2.351 0 0-.085-.004-.073.055-.051.039.015.094.015.094.309 1.5 2.926 11.75 17.344 14.965 7.719 1.722 18.191-.231 20.082-.61Zm0 0"
                        style={{
                          stroke: "none",
                          fillRule: "nonzero",
                          fill: "#f3df92",
                          fillOpacity: 1,
                        }}
                      />
                      <path
                        d="M51.879 43.492c.02.313.031.567.039.758.168-.227.422-.559.75-.977 1.82-3.035 6.094-10.71 7.094-17.457.402-2.73.43-5.16.199-7.316-1.426 1.652-2.793 3.684-4.016 6.18-3.12 6.37-3.886 15.586-4.066 18.812Zm.516.598c-.29.488-.524.86-.665 1.086h-.082l-.015.043.066.047c1.774-.758 11.512-5.086 16.895-10.88 1.875-2.019 3.277-4.007 4.308-5.913-2.109.554-4.386 1.453-6.808 2.816-5.887 3.316-11.477 9.973-13.7 12.8Zm-8.86-18.274c1.055 7.133 5.774 15.309 7.383 17.934.152.203.281.367.379.5.008-.191.02-.445.039-.758-.18-3.226-.945-12.441-4.066-18.812-1.204-2.453-2.543-4.453-3.942-6.094-.219 2.137-.187 4.539.207 7.23Zm7.977 19.45.07-.047-.016-.043-.375-.606c-1.91-2.48-7.824-9.761-14.07-13.28-2.422-1.364-4.7-2.263-6.809-2.817 1.032 1.906 2.434 3.894 4.31 5.914 5.382 5.793 15.12 10.12 16.89 10.879Zm0 0"
                        style={{
                          stroke: "none",
                          fillRule: "nonzero",
                          fill: "#f3df92",
                          fillOpacity: 1,
                        }}
                      />
                      <g clipPath="url(#b)">
                        <path
                          d="m1.645 55.656 5.273 12.946 5.234-12.946h1.54L7.542 70.41H6.277L.13 55.656Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#45413f",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#c)">
                        <path
                          d="M15.453 59.582h1.414V70.41h-1.414Zm0-4.34h1.414v2.078h-1.414Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#45413f",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#d)">
                        <path
                          d="M19.96 55.242h1.411v12.715c0 .402.113.715.332.945.223.227.535.344.938.344.152 0 .332-.023.539-.062.207-.043.402-.098.582-.168l.25 1.144c-.266.11-.586.2-.969.27a5.84 5.84 0 0 1-.984.101c-.653 0-1.164-.183-1.54-.55-.37-.364-.558-.883-.558-1.547Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#45413f",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#e)">
                        <path
                          d="M25.441 55.242h1.414v12.715c0 .402.11.715.332.945.223.227.532.344.934.344a3.505 3.505 0 0 0 1.121-.23l.25 1.144c-.265.11-.586.2-.965.27a5.92 5.92 0 0 1-.988.101c-.648 0-1.164-.183-1.535-.55-.375-.364-.563-.883-.563-1.547Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#45413f",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#f)">
                        <path
                          d="M34.082 69.535c.621 0 1.242-.137 1.86-.402.613-.274 1.101-.645 1.46-1.113.098-.125.18-.262.25-.407a.938.938 0 0 0 .106-.406v-1.766a8.772 8.772 0 0 0-1.477-.414 7.937 7.937 0 0 0-1.492-.144c-1.012 0-1.832.203-2.465.613-.629.406-.941.973-.941 1.692 0 .292.055.574.164.851.11.277.281.527.508.746.23.223.511.403.843.543.332.137.727.207 1.184.207Zm-.355 1.082c-.551 0-1.059-.09-1.516-.262a3.473 3.473 0 0 1-1.172-.714 3.288 3.288 0 0 1-.758-1.063 3.057 3.057 0 0 1-.27-1.266c0-.5.11-.953.333-1.359.222-.41.531-.758.933-1.05.403-.29.883-.516 1.442-.676a6.938 6.938 0 0 1 1.86-.239c.542 0 1.093.047 1.663.145a7.41 7.41 0 0 1 1.516.418v-.977c0-.957-.274-1.715-.82-2.277-.547-.559-1.286-.84-2.211-.84-.582 0-1.16.11-1.735.332a8.58 8.58 0 0 0-1.758.953l-.496-.933c.707-.47 1.39-.825 2.055-1.059a6.192 6.192 0 0 1 2.078-.352c1.313 0 2.36.38 3.133 1.141.777.762 1.164 1.816 1.164 3.16v4.88c0 .39.168.581.5.581v1.25c-.113.012-.215.02-.313.028a3.18 3.18 0 0 1-.25.011c-.277 0-.527-.082-.757-.25-.227-.164-.356-.414-.383-.746l-.043-.851a4.672 4.672 0 0 1-1.86 1.484 5.56 5.56 0 0 1-2.335.531Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#45413f",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#g)">
                        <path
                          d="M59.871 70.41V59.793l-4.379 8.039h-1.289l-4.402-8.039V70.41h-2.324V55.656h2.488l4.883 9.016 4.879-9.016h2.492V70.41Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#312f2d",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#h)">
                        <path
                          d="M68.758 68.934c.555 0 1.078-.102 1.57-.301.492-.203.875-.48 1.152-.844.29-.246.434-.512.434-.789v-1.434a6.748 6.748 0 0 0-1.234-.351 6.931 6.931 0 0 0-1.278-.125c-.816 0-1.484.176-2.004.527-.52.356-.777.824-.777 1.406 0 .54.2.993.602 1.36.402.367.914.55 1.535.55Zm-.621 1.683c-.528 0-1.016-.09-1.465-.262a3.555 3.555 0 0 1-1.164-.714 3.341 3.341 0 0 1-.766-1.082 3.234 3.234 0 0 1-.281-1.352c0-.512.11-.977.332-1.39.223-.415.535-.774.945-1.083.407-.304.89-.539 1.453-.703a6.469 6.469 0 0 1 1.86-.25 8.17 8.17 0 0 1 1.515.137c.496.09.95.207 1.348.36v-.747c0-.8-.227-1.43-.684-1.879-.457-.453-1.113-.675-1.972-.675-.582 0-1.153.105-1.715.32a8.641 8.641 0 0 0-1.73.926l-.708-1.453c1.399-.942 2.852-1.415 4.36-1.415 1.496 0 2.66.383 3.488 1.145.832.762 1.246 1.855 1.246 3.281v3.926c0 .262.051.45.145.563.097.109.265.171.5.183v1.957a6.34 6.34 0 0 1-.614.082 8.29 8.29 0 0 1-.507.02c-.442-.028-.778-.145-1.008-.352a1.391 1.391 0 0 1-.426-.832l-.062-.687a4.764 4.764 0 0 1-1.797 1.464 5.253 5.253 0 0 1-2.293.512Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#312f2d",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#i)">
                        <path
                          d="M86.742 70.41h-2.285v-6.09c0-1.023-.164-1.77-.496-2.23-.332-.465-.813-.7-1.434-.7-.332 0-.668.063-1.007.188-.34.125-.653.3-.946.531a4.04 4.04 0 0 0-.777.809 3.72 3.72 0 0 0-.531 1.027v6.461H76.98V59.543h2.079v2.18c.414-.735 1.015-1.313 1.808-1.735.79-.422 1.66-.633 2.613-.633.653 0 1.188.118 1.61.352.422.238.754.559 1 .969.238.406.41.879.508 1.41a9.48 9.48 0 0 1 .144 1.695Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#312f2d",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#j)">
                        <path
                          d="M89.316 59.543h2.286V70.41h-2.286Zm0-4.3h2.286v2.51h-2.286Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#312f2d",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                      <g clipPath="url(#k)">
                        <path
                          d="M98.352 70.617a8.64 8.64 0 0 1-1.34-.105 9.61 9.61 0 0 1-1.328-.301 8.943 8.943 0 0 1-1.246-.477 5.603 5.603 0 0 1-1.051-.636l.957-1.535c1.328.925 2.648 1.39 3.965 1.39.691 0 1.238-.129 1.64-.394.403-.262.602-.637.602-1.121 0-.458-.223-.793-.676-1.008-.45-.215-1.164-.442-2.148-.676a17.887 17.887 0 0 1-1.743-.508c-.484-.176-.879-.367-1.183-.582a1.937 1.937 0 0 1-.664-.77c-.14-.296-.211-.656-.211-1.07 0-.554.113-1.043.332-1.476.222-.426.523-.79.906-1.09.379-.297.828-.52 1.348-.676a6.067 6.067 0 0 1 1.672-.227c.789 0 1.55.125 2.285.375.734.247 1.39.586 1.972 1.016l-.976 1.395c-1.04-.778-2.145-1.164-3.324-1.164-.579 0-1.07.12-1.473.363-.402.242-.602.625-.602 1.152 0 .223.04.41.125.563.082.152.22.28.403.394.187.11.433.211.738.301s.68.191 1.121.3c.75.18 1.39.36 1.934.54.539.18.984.39 1.336.633.355.246.613.527.78.855.165.324.25.715.25 1.172 0 .512-.105.977-.312 1.39-.207.419-.504.77-.882 1.063-.38.29-.844.516-1.391.672a6.447 6.447 0 0 1-1.816.242Zm0 0"
                          style={{
                            stroke: "none",
                            fillRule: "nonzero",
                            fill: "#312f2d",
                            fillOpacity: 1,
                          }}
                        />
                      </g>
                    </svg>
                  </div>

                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-300 bg-base-200 hover:bg-gray-50"
                  >
                    <div className="collapse-title text-base font-medium flex align-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="gray"
                        className="w-6 h-6"
                      >
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                      </svg>
                      <div className="w-6" />
                      <p className="text-gray-500">Dashboard</p>
                    </div>
                    <div className="collapse-content">
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleMainPage}
                      >
                        <p className="text-gray-500">Dashboard</p>
                      </div>
                    </div>
                  </div>

                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-300 bg-base-200 hover:bg-gray-50"
                  >
                    <div className="collapse-title base font-medium flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="gray"
                        className="w-6 h-6"
                      >
                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                        <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                      </svg>
                      <div className="w-6" />
                      <p className="text-gray-500">Laporan</p>
                    </div>
                    <div className="collapse-content">
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleCashFlowPage}
                      >
                        <p className="text-gray-500">Arus Kas</p>
                      </div>
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleReportJournalPage}
                      >
                        <p className="text-gray-500">Jurnal Umum</p>
                      </div>
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleBalanceSheetPage}
                      >
                        <p className="text-gray-500">Neraca Saldo</p>
                      </div>
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleIncomeStatementPage}
                      >
                        <p className="text-gray-500">Laba Rugi</p>
                      </div>
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleStatementOfOwnerEquityPage}
                      >
                        <p className="text-gray-500">Perubahan Modal</p>
                      </div>
                    </div>
                  </div>

                  <div
                    tabIndex={1}
                    className="collapse collapse-arrow border border-base-300 bg-base-200 hover:bg-gray-50"
                  >
                    <div className="collapse-title base font-medium flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="gray"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                          clipRule="evenodd"
                        />
                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                      </svg>
                      <div className="w-6" />
                      <p className="text-gray-500">Pemasukan</p>
                    </div>
                    <div className="collapse-content">
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleIncomePage}
                      >
                        <p className="text-gray-500">Pemasukan</p>
                      </div>
                    </div>
                  </div>

                  <div
                    tabIndex={2}
                    className="collapse collapse-arrow border border-base-300 bg-base-200 hover:bg-gray-50"
                  >
                    <div className="collapse-title base font-medium flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="grey"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                          clipRule="evenodd"
                        />
                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                      </svg>
                      <div className="w-6" />
                      <p className="text-gray-500">Pengeluaran</p>
                    </div>
                    <div className="collapse-content">
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleExpenditurePage}
                      >
                        <p className="text-gray-500">Pengeluaran</p>
                      </div>
                    </div>
                  </div>

                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-300 bg-base-200 hover:bg-gray-50"
                  >
                    <div className="collapse-title base font-medium flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="gray"
                        className="w-6 h-6"
                      >
                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                        <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                      </svg>
                      <div className="w-6" />
                      <p className="text-gray-500">Account</p>
                    </div>
                    <div className="collapse-content">
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleCategory}
                      >
                        <p className="text-gray-500">Category</p>
                      </div>
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleCOA}
                      >
                        <p className="text-gray-500">COA</p>
                      </div>
                    </div>
                  </div>

                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-300 bg-base-200 hover:bg-gray-50"
                  >
                    <div className="collapse-title base font-medium flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="gray"
                        className="w-6 h-6 cursor-pointer"
                        onClick={handleUser}
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="w-6" />
                      <p className="text-gray-500">User</p>
                    </div>
                    <div className="collapse-content">
                      <div
                        className="hover:bg-gray-200 rounded p-2 cursor-pointer flex items-center"
                        onClick={handleUser}
                      >
                        <p className="text-gray-500">User</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-base-300 bg-base-200 rounded-2xl hover:bg-gray-50">
                    <div className="collapse-title base font-medium flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="gray"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="w-6" />
                      <p
                        className="text-gray-500 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-950 h-screen fixed left z-[2] px-4 space-y-6 pt-4 w-min">
                  <svg width="28" height="28" version="1.2">
                    <defs>
                      <image
                        id="a"
                        width="28"
                        height="28"
                        href="data:image/png;base64,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"
                      />
                    </defs>
                    <use y="2" href="#a" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="gray"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleMainPage}
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="gray"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleReportPage}
                  >
                    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                    <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="gray"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleIncomePage}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                      clipRule="evenodd"
                    />
                    <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="grey"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleExpenditurePage}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                      clipRule="evenodd"
                    />
                    <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="gray"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleCOA}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="gray"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleUser}
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="gray"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}
          <div className="flex">
            {withSidebar && <div className="w-12" />}
            <div className="flex flex-col w-full min-h-screen">
              {withNavbar && <div className="h-14" />}
              <div className="flex">
                <div
                  className="w-full"
                  style={{
                    marginLeft: navSidebar ? "12.5rem" : "0",
                  }}
                >
                  {children}
                </div>
              </div>
              <div className="grow" />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
