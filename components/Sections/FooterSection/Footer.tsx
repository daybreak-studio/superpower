import LineElement from "@/components/LineElement/LineElement";
import { useMobileBreakpoint } from "@/hooks/useBreakpoints";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";

const Footer = () => {
  const isMobile = useMobileBreakpoint();
  const FooterLink = (props: any) => {
    const { children, href } = props;

    return (
      <span className="flex items-baseline gap-1.5">
        <Arrow className="inline-block fill-none" />
        <Link
          className="inline-block text-black hover:text-[#FE8000]"
          style={{
            transition: "0.3s ease-in-out",
          }}
          target="_blank"
          rel="noreferrer"
          href={href}
        >
          {children}{" "}
        </Link>
      </span>
    );
  };

  return (
    <>
      <section
        className="mx-4 flex flex-col gap-20 pb-8 lg:mx-14 lg:gap-10 lg:pb-12"
        style={{ textRendering: "geometricPrecision" }}
      >
        <div className="relative">
          <div className="relative flex w-full flex-col gap-6 self-center object-center">
            {/* <SuperpowerLogo className="w-11/12 p-6" /> */}

            <video
              src="footer-section/bg-vid.webm"
              className="h-[16vw] w-full bg-cover object-cover lg:h-[14vw]"
              style={{
                maskRepeat: "no-repeat",
                maskImage: "url(../footer-section/logo.svg)",
                maskOrigin: "left",
                maskSize: "100%",
                maskPosition: "top left",
              }}
              autoPlay
              muted
              loop
              playsInline
            ></video>
          </div>
          <nav className="grid grid-cols-1 gap-4 sm:w-[500px] sm:grid-cols-3 sm:grid-rows-1">
            <motion.div className="flex gap-4 border-l-2 border-zinc-300 pl-2 sm:flex-col sm:gap-0 lg:pl-4">
              <FooterLink href="https://twitter.com/superpower">
                Twitter
              </FooterLink>
              <FooterLink href="https://www.instagram.com/superpower.health">
                Instagram
              </FooterLink>
              <FooterLink href="https://www.linkedin.com/company/superpower-health">
                LinkedIn
              </FooterLink>
            </motion.div>

            <motion.div className="flex gap-4 border-l-2 border-zinc-300 pl-2 sm:flex-col sm:gap-0 lg:pl-4">
              <FooterLink href="https://superpowerhealth.notion.site/Build-Superpower-with-us-484d862f400a4bcd95c5e15c406e720f?pvs=4">
                Careers
              </FooterLink>
              <FooterLink href="https://superpower.com/manifesto">
                Manifesto
              </FooterLink>
              <FooterLink href="https://app.superpower.com/signin">
                Log in
              </FooterLink>
            </motion.div>
            <motion.div className="flex gap-4 border-l-2 border-zinc-300 pl-2 sm:flex-col sm:gap-0 lg:pl-4">
              <FooterLink href="https://www.superpower.com/medical-group-of-informed-consent">
                Clinical Policy
              </FooterLink>
              <FooterLink href="https://superpower.com/terms">
                Terms of Service
              </FooterLink>
              <FooterLink href="https://superpower.com/privacy">
                Privacy Policy
              </FooterLink>
            </motion.div>
          </nav>
          <div className="mt-8 lg:absolute lg:bottom-0 lg:right-0 lg:text-right">
            <small className="font-mono-xs leading-4">
              2024 Superpower Health, Inc.
              <br />
              All Rights Reserved
            </small>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;

const Arrow = (className?: any) => (
  <svg
    className={className}
    fill="none"
    height="10"
    width="10"
    viewBox="0 0 7 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.5 1L5.5 5L1.5 9" stroke="#FE8000" strokeWidth="2" />
  </svg>
);

const SuperpowerLogo = (props: any) => {
  const { className } = props;

  return (
    <svg
      className={className}
      viewBox="0 0 1609 223"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.24431 52.1783C8.24431 -6.19576 124.614 -18.3149 131.911 51.5723C132.109 56.218 130.136 58.4399 126.783 58.4399H97.7895C94.4365 58.4399 92.8586 56.824 92.0696 53.1882C87.5332 25.7181 47.4943 31.9797 47.4943 52.1783C47.4943 83.6882 134.87 60.4597 134.87 119.844C134.87 185.691 7.45537 187.307 0.749344 117.218C0.552108 112.976 2.52447 111.158 6.07471 111.158H35.0684C38.2242 111.158 39.9993 112.976 40.7883 116.814C45.7192 144.284 94.2392 143.072 94.2392 119.844C94.2392 90.3537 8.24431 111.158 8.24431 52.1783ZM250.45 13.3969C250.45 9.55918 252.028 7.33733 256.367 7.33733H283.98C288.122 7.33733 290.095 9.55918 290.095 13.3969V92.3736C290.095 131.559 266.229 167.714 218.892 167.714C171.556 167.714 147.493 131.559 147.493 92.3736L147.296 13.3969C147.296 9.55918 149.465 7.33733 153.41 7.33733H181.418C185.954 7.33733 187.532 9.55918 187.532 13.3969L187.729 92.3736C187.729 122.066 202.522 131.357 218.892 131.357C235.263 131.357 250.253 122.066 250.253 92.3736L250.45 13.3969ZM594.43 69.1451H519.48C519.48 53.1882 534.667 34.6055 558.927 34.6055C583.187 34.6055 594.43 53.1882 594.43 69.1451ZM633.877 92.7775V87.1219C633.877 41.675 608.433 2.48965 557.941 2.48965C520.466 2.48965 493.642 27.9399 483.78 61.2677C479.441 75.8107 478.849 91.5656 482.005 106.715C489.895 143.88 518.099 172.158 557.941 172.158C564.252 172.158 616.323 172.158 632.299 120.046C633.285 116.612 631.904 115.4 629.143 115.4H597.585C595.613 115.4 594.232 116.41 593.246 118.43C590.09 125.297 581.806 138.83 557.941 138.83C536.837 138.83 519.48 119.44 519.48 99.2411H627.762C631.707 99.2411 633.877 96.8173 633.877 92.7775ZM1452.21 69.5491H1382.78C1382.78 53.9962 1395.6 35.8174 1419.47 35.8174C1443.33 35.8174 1452.21 53.9962 1452.21 69.5491ZM1494.61 92.7775V87.1219C1494.61 41.675 1468.97 2.48965 1418.48 2.48965C1381.01 2.48965 1354.18 27.7379 1344.32 61.2677C1339.78 75.8107 1339.19 91.5656 1342.55 106.715C1350.24 143.88 1378.64 172.158 1418.48 172.158C1424.79 172.158 1476.86 172.158 1493.04 120.248C1494.02 116.612 1492.64 115.4 1489.68 115.4H1458.32C1456.15 115.4 1454.77 116.41 1453.79 118.43C1450.63 125.297 1442.35 139.032 1418.48 139.032C1397.38 139.032 1381.99 119.642 1381.99 99.2411H1488.3C1492.44 99.2411 1494.61 96.8173 1494.61 92.7775ZM1600.33 7.33733C1605.86 7.33733 1608.62 10.5691 1608.62 16.4267V40.0591C1608.62 46.1187 1605.46 48.7445 1599.54 48.7445C1565.03 48.7445 1548.46 65.3074 1548.46 107.927V161.453C1548.46 165.291 1546.09 167.31 1542.74 167.31H1513.35C1510 167.31 1508.03 165.291 1508.03 161.453V107.927C1508.03 71.165 1518.09 7.33733 1600.33 7.33733ZM1235.84 7.33733H1204.09C1201.92 7.33733 1201.13 8.14527 1200.34 10.5691L1168.39 107.523L1143.53 10.5691C1142.94 8.14527 1141.96 7.33733 1139.79 7.33733H1102.51C1099.35 7.33733 1099.75 9.35719 1100.34 11.579L1138.6 163.069C1139.39 166.503 1140.77 167.31 1144.52 167.31H1184.17C1187.12 167.31 1188.9 166.099 1189.88 162.867L1220.06 68.3372L1250.04 162.867C1251.03 166.099 1253 167.31 1255.76 167.31H1295.6C1299.35 167.31 1300.73 166.503 1301.52 163.069L1339.78 11.579C1340.38 9.35719 1340.77 7.33733 1337.42 7.33733H1300.34C1297.97 7.33733 1296.98 8.14527 1296.39 10.5691L1271.54 107.523L1239.79 10.5691C1239 8.14527 1238.01 7.33733 1235.84 7.33733ZM978.448 87.1219C978.448 58.6419 993.438 40.2611 1017.3 40.2611C1041.17 40.2611 1058.33 58.6419 1058.33 87.1219C1058.33 115.602 1040.58 134.387 1017.3 134.387C994.03 134.387 978.448 115.804 978.448 87.1219ZM1017.3 2.48965C970.756 2.48965 937.226 41.675 937.226 87.1219C937.226 132.569 970.756 172.158 1017.3 172.158C1063.85 172.158 1099.55 133.781 1099.55 87.1219C1099.55 40.4631 1062.08 2.48965 1017.3 2.48965ZM740.779 7.33733C746.301 7.33733 749.063 10.5691 749.063 16.4267V40.0591C749.063 46.1187 745.907 48.7445 739.99 48.7445C705.473 48.7445 688.906 65.3074 688.906 107.927V161.453C688.906 165.291 686.539 167.31 683.186 167.31H653.798C650.445 167.31 648.472 165.291 648.472 161.453V107.927C648.472 71.165 658.531 7.33733 740.779 7.33733ZM803.105 83.8901C803.105 111.966 817.898 130.347 841.369 130.347C864.84 130.347 881.408 112.168 881.408 83.8901C881.408 55.6121 864.248 37.8373 841.369 37.8373C818.49 37.8373 803.105 56.016 803.105 83.8901ZM805.275 150.95V216.595C805.275 220.433 803.105 222.453 799.752 222.453H770.167C766.814 222.453 764.841 220.433 764.841 216.595V16.2247C764.841 10.3671 767.997 7.33733 773.717 7.33733H798.174C804.091 7.33733 805.275 10.3671 805.275 16.2247V30.7677H807.444C837.622 -27.4043 923.616 4.10555 923.616 83.8901C923.616 169.532 836.241 184.883 805.275 150.95ZM345.518 83.8901C345.518 111.966 360.508 130.347 383.782 130.347C407.055 130.347 423.82 112.168 423.82 83.8901C423.82 55.6121 406.858 37.8373 383.782 37.8373C360.705 37.8373 345.518 56.016 345.518 83.8901ZM347.293 150.95V216.595C347.293 220.433 344.926 222.453 341.573 222.453H312.185C308.635 222.453 306.86 220.433 306.86 216.595V16.2247C306.86 10.3671 309.818 7.33733 315.538 7.33733H340.192C346.11 7.33733 347.293 10.3671 347.293 16.2247V30.7677H349.265C379.442 -27.4043 465.437 4.10555 465.437 83.8901C465.437 169.532 378.062 184.883 347.293 150.95Z" />
    </svg>
  );
};
