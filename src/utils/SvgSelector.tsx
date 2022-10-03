import React from 'react';

export const SvgSelector: React.FC<PropsType> = ({ id }) => {
  switch (id) {
    case 'edit':
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5176 1.43726C16.6843 1.28806 17.8647 1.76518 19.0642 2.89373L19.0655 2.89503C20.269 4.03312 20.8168 5.18762 20.7346 6.3635C20.6552 7.49975 19.9965 8.46146 19.2454 9.25501M19.2454 9.25501L11.0395 17.9407C10.8081 18.1926 10.4966 18.406 10.2013 18.5639C9.90225 18.7238 9.55628 18.8606 9.23149 18.9184L9.2265 18.9193L6.00765 19.469C5.22708 19.6036 4.47858 19.4086 3.94538 18.9029C3.41293 18.398 3.17764 17.6616 3.2648 16.8771L3.26506 16.8749L3.63666 13.6208C3.67982 13.2971 3.80004 12.9468 3.94175 12.643C4.08295 12.3402 4.2756 12.0191 4.50358 11.7764L4.50504 11.7749L12.715 3.08489C13.4666 2.29102 14.3901 1.58143 15.5176 1.43726M13.8049 4.11556C13.8047 4.11569 13.805 4.11542 13.8049 4.11556L5.59685 12.8035C5.59668 12.8036 5.59702 12.8033 5.59685 12.8035C5.51488 12.8909 5.40228 13.0602 5.30119 13.2769C5.20193 13.4898 5.14231 13.6867 5.12444 13.8133L4.75563 17.0428C4.75559 17.0431 4.75555 17.0435 4.75552 17.0438C4.71301 17.4287 4.83264 17.6771 4.97755 17.8145C5.12185 17.9513 5.37335 18.0563 5.75279 17.9909L5.75394 17.9907L8.97105 17.4412C9.09632 17.4185 9.28934 17.3505 9.4941 17.241C9.70168 17.1301 9.85783 17.0104 9.936 16.9246L9.94496 16.9148L18.155 8.22489C18.8237 7.51855 19.1952 6.87489 19.2383 6.2589C19.2786 5.68244 19.0416 4.93718 18.0357 3.98564C17.0354 3.04465 16.281 2.85185 15.7078 2.92514C15.0954 3.00345 14.4732 3.40968 13.8049 4.11556Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.7743 4.30885C12.1836 4.24509 12.5671 4.52518 12.6308 4.93446C13.0079 7.35508 14.9725 9.20768 17.4149 9.45369C17.827 9.4952 18.1275 9.86294 18.086 10.2751C18.0445 10.6872 17.6767 10.9876 17.2646 10.9461C14.147 10.6321 11.6316 8.26475 11.1487 5.16537C11.0849 4.75609 11.365 4.37262 11.7743 4.30885Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.25 22C2.25 21.5858 2.58579 21.25 3 21.25H21C21.4142 21.25 21.75 21.5858 21.75 22C21.75 22.4142 21.4142 22.75 21 22.75H3C2.58579 22.75 2.25 22.4142 2.25 22Z"
            fill="black"
          />
        </svg>
      );
    default:
      return <svg />;
  }
};

type PropsType = {
  id: string;
};