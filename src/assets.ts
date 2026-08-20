// Local project image assets — every generated/supplied asset lives in the
// project source tree and is bundled with the build (no image database,
// no CMS, no remote image dependency for core brand imagery).

import logo from "./assets/images/logo/zivra-health-logo.png";
import drAdeel from "./assets/images/doctor/dr-adeel.png";
import doctorConsultation from "./assets/images/about/doctor-consultation.jpg";
import doctorClinic from "./assets/images/about/doctor-clinic.jpg";
import urinaryHealth from "./assets/images/conditions/urinary-health.jpg";
import kidneyStones from "./assets/images/conditions/kidney-stones.jpg";
import prostateHealth from "./assets/images/conditions/prostate-health.jpg";
import maleUrology from "./assets/images/conditions/male-urology.jpg";
import bladderHealth from "./assets/images/conditions/bladder-health.jpg";
import sexualHealth from "./assets/images/conditions/sexual-health.jpg";

export const IMG = {
  logo,
  drAdeel,
  doctorConsultation,
  doctorClinic,
  urinaryHealth,
  kidneyStones,
  prostateHealth,
  maleUrology,
  bladderHealth,
  sexualHealth,
} as const;
