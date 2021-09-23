import { useState, useRef } from "react";

// export const useCompare = () => {
// 반짝이는 듯속에 나는 두 손 모아 빌었지(50유효타수, 4초)
// 50타 * 60초 / 4초 => 750타
// 백스페이스 7번
// 스페이스는 하나만 인정(배열에는 스페이스 하나당 세개씩 들어감)
// 빈 칸 3칸이면 undefinded가 9개 들어감
// 타수 계산(타수 * 60 / 걸린시간(초))
// 48글자 * 60초 / 10초 ::::: 2880 / 10 => 288타
// 현재속도 = (타수(자음, 모음 분리) - 백스페이스 * 2) / 경과시간(초) * 60초
// 한컴타자는 백스페이스 * 3

export const tasuCalculator = (kor) => {
  const f = [
    "ㄱ", // -31439
    "ㄲ", // -31438
    "ㄴ", // -31436
    "ㄷ", // -31433
    "ㄸ", // -31432
    "ㄹ", // -31431
    "ㅁ", // -31423
    "ㅂ", // -31422
    "ㅃ", // -31421
    "ㅅ", // -31419
    "ㅆ", // -31418
    "ㅇ", // -31417
    "ㅈ", // -31416
    "ㅉ", // -31415
    "ㅊ", // -31414
    "ㅋ", // -31413
    "ㅌ", // -31412
    "균", // -31411
    "ㅎ", // -31410
  ];
  const s = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const t = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const ga = 44032;
  let result = [];

  for (let i = 0; i < kor.length; i++) {
    let uni = kor[i].charCodeAt(0);
    uni = uni - ga;

    // 자음 입력 하나만 된 것 => ("강", "ㅎ") "ㅎ"의 경우
    if (uni < 0) {
      if (uni === -31439) {
        result.push(f[0]);
      }
      if (uni === -31438) {
        result.push(f[1]);
      }
      if (uni === -31436) {
        result.push(f[2]);
      }
      if (uni === -31433) {
        result.push(f[3]);
      }
      if (uni === -31432) {
        result.push(f[4]);
      }
      if (uni === -31431) {
        result.push(f[5]);
      }
      if (uni === -31423) {
        result.push(f[6]);
      }
      if (uni === -31422) {
        result.push(f[7]);
      }
      if (uni === -31421) {
        result.push(f[8]);
      }
      if (uni === -31419) {
        result.push(f[9]);
      }
      if (uni === -31418) {
        result.push(f[10]);
      }
      if (uni === -31417) {
        result.push(f[11]);
      }
      if (uni === -31416) {
        result.push(f[12]);
      }
      if (uni === -31415) {
        result.push(f[13]);
      }
      if (uni === -31414) {
        result.push(f[14]);
      }
      if (uni === -31413) {
        result.push(f[15]);
      }
      if (uni === -31412) {
        result.push(f[16]);
      }
      if (uni === -31411) {
        result.push(f[17]);
      }
      if (uni === -31410) {
        result.push(f[18]);
      }
    } else {
      let fn = parseInt(uni / 588);
      let sn = parseInt((uni - fn * 588) / 28);
      let tn = parseInt(uni % 28);

      if (tn === 0) {
        result.push(f[fn], s[sn]);
      } else {
        result.push(f[fn], s[sn], t[tn]);
      }
    }
  }

  let consonantAndVowel = result.filter((item) => {
    return item !== null && item !== undefined;
    // && item !== "";
  });

  return consonantAndVowel;
};
