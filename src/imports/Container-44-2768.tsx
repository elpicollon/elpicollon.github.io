import svgPaths from "./svg-09pvuzjrwb";
import imgEu1 from "figma:asset/86c5576817c3134e84e9e3e13ae008ce43b91a20.png";

function Container() {
  return <div className="border border-[rgba(173,70,255,0.3)] border-solid rounded-[1.67772e+07px] size-[113.985px]" data-name="Container" />;
}

function Container1() {
  return <div className="blur-lg filter h-[611.813px] rounded-[32px] w-[500.529px]" data-name="Container" style={{ backgroundImage: "linear-gradient(50.7131deg, rgba(152, 16, 250, 0.2) 0%, rgba(21, 93, 252, 0.2) 100%)" }} />;
}

function Container2() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.2)] h-[558px] left-0 opacity-60 to-[#000000] to-[80.288%] top-0 via-50% via-[rgba(0,0,0,0.1)] w-[446px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0">Rodrigo Picolo</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.6)] text-nowrap top-[0.5px] tracking-[0.6px] uppercase">{`Product Designer & PROFESSOR`}</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[44px] relative shrink-0 w-[131.367px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1d59db00} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#ad46ff] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col h-[78px] items-start left-[24px] pb-px pt-[17px] px-[17px] rounded-[14px] top-[456px] w-[398px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#0f0f12] border border-[rgba(255,255,255,0.1)] border-solid h-[560px] left-0 overflow-clip rounded-[32px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[448px]" data-name="Container">
      <div className="absolute h-[559px] left-0 top-[-0.06px] w-[447px]" data-name="eu 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[99.96%] left-[-8.28%] max-w-none top-0 w-[116.55%]" src={imgEu1} />
        </div>
      </div>
      <Container2 />
      <Container6 />
    </div>
  );
}

export default function Container8() {
  return (
    <div className="relative size-full" data-name="Container">
      <div className="absolute flex items-center justify-center left-[279.55px] size-[135.34px] top-[-56.99px]" style={{ "--transform-inner-width": "2", "--transform-inner-height": "2" } as React.CSSProperties}>
        <div className="flex-none rotate-[77.904deg]">
          <Container />
        </div>
      </div>
      <div className="absolute flex h-[637.17px] items-center justify-center left-[-58.28px] top-[-25.91px] w-[531.863px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[3deg]">
          <Container1 />
        </div>
      </div>
      <Container7 />
    </div>
  );
}