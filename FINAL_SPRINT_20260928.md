# Five-plant final-sprint results

Route: `/results/final-sprint-20260928/`.

This is the confirmed-board edition of the 28 September 2026 capture. Saswat
confirmed 25 mm squares, 18 mm markers, a 7 x 10 layout and DICT_4X4_50.
The old result pages remain available as historical work.

The page includes 24 full-resolution geometry selections (D405, aligned L515,
fused and cleaned; all plants and P1-P5 individually), compressed PLY downloads,
point provenance, all 47 manual-reference dispositions, both hyperspectral
camera inspectors and all-sample quality/index diagnostics. Six provisional
spectra refer to three P5 vertices; this is not dense spectral fusion across
the plants. The attempted height model failed held-out prediction and is
documented rather than used to manufacture assignments.

`public/results/final-sprint-20260928/website_provenance.json` records asset
hashes. `study_requirements.json` separates completed outputs from unresolved
scientific requirements. The evidence directory includes calibration,
cross-camera selection, cleanup and numerical checks. Cloud display is Y-up;
downloaded PLY coordinates retain the documented D405 reference frame.

The new scale anchors lengths to the supplied board, but print tolerance,
device metadata, anatomical endpoint correspondence, calibrated reflectance,
hidden surfaces and independent physical accuracy remain limited. The source
recordings and full-scene research runs remain in the PhenoFusion3D research
workspace. Protected lab capture/gantry source was not changed for this page.

Build locally with `pnpm build`; the static export is `out/`. The usual
NEXT_PUBLIC_BASE_PATH setting is respected. This task prepares a local result;
it does not push, deploy or establish live publication. Review and push through
the existing GitHub Pages workflow when ready.

Verification completed: static production build, 414 local links, all 24
geometry selections and 47 expanded manual rows; actual WebGL, both spectral
cameras, exact source-pixel links and phone-width layout. Final receipts are
in the result assets under `evidence/final_verification.json` and
`evidence/spectral_browser/validation.json`.
