const GlobalStyle = {
  container: "w-full min-h-screen pt-20 text-secondary",
  containerAdmin: "w-full h-screen pt-20 text-secondary pl-64 max-lg:pl-0",
  containerStatic:
    "w-full h-screen flex items-center justify-center text-secondary pt-20",
  form: "w-5/6 md:w-1/2 lg:w-1/3 p-10 flex flex-col gap-5 items-center bg-white",
  input: "w-full border h-8 outline-none rounded p-3 text-xs",
  inputTwo:
    "w-full md:w-2/3 lg:w-1/2 border h-8 outline-none rounded p-3 text-xs",
  inputThree: "w-full border h-12 outline-none rounded p-3 text-xs",
  inputFour: "w-fit border h-12 outline-none rounded p-3 text-xs",
  inputText: "w-full border h-15 outline-none rounded p-3 text-xs resize-none",
  formHeader: "text-lg font-semibold text-secondary capitalize",
  formButton:
    "text-xs text-white bg-secondary hover:bg-primary hover:text-secondary w-full h-8 transition-all ease-in-out duration-1000 capitalize",
  smallText: "text-xs",
  categoryLink:
    "w-full p-5 bg-secondary text-white capitalize border border-secondary hover:bg-white hover:text-secondary transition-all ease-in-out duration-1000 max-sm:text-xs",
  separator: "w-full p-5 lg:p-10",
  separatorCenter: "w-full p-5 lg:p-10 flex justify-center",
  separatorX: "w-full px-5 lg:px-10",
  separatorY: "w-full py-5 lg:py-10",
  separatorXCenter: "w-full px-5 lg:px-10 flex justify-center",
  productGrid:
    "w-full px-5 lg:px-10 gap-2 md:gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  productGridAdmin:
    "w-full gap-2 md:gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  weightButton:
    "w-10 h-10 flex items-center justify-center text-white bg-secondary hover:bg-white hover:text-secondary transition-all ease-in-out duration-1000 border border-secondary",
  fullButton:
    "text-xs text-white bg-secondary hover:bg-white hover:text-secondary w-full h-8 flex items-center justify-center transition-all ease-in-out duration-1000 border border-secondary capitalize",
  smallButton:
    "text-xs text-white bg-secondary hover:bg-white hover:text-secondary px-5 w-fit h-8 flex items-center justify-center transition-all ease-in-out duration-1000 border border-secondary capitalize",
  column: "py-2 border-b w-full flex justify-between items-center",
  columnUser: "w-full flex justify-between py-1 gap-10 items-center",
  accountLink:
    "w-full p-3 flex items-center gap-5 hover:bg-secondary/10 transition-all ease-in-out duration-1000 capitalize",
  navWrap: "w-full h-20 text-sm fixed text-secondary bg-white z-30 border border-white",
  navContainer: "h-full w-full flex justify-between items-center px-5 relative",
  adminWrap:
    "w-full h-full bg-gray-100 p-5 lg:p-10 overflow-scroll rounded-t-3xl",
  dashboardInfo:
    "w-full p-8 bg-white flex justify-between items-center border rounded-3xl",
};

export default GlobalStyle;
