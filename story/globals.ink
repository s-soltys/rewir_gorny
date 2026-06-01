// ============================================================
// GLOBALS — Rewir Górny
// Variable declarations for traits, relationships, and flags
// ============================================================

// --- Trait levels (scale 0-5) ---
// These act as inner voices. Higher = louder, more insistent.
VAR nostalgia = 1
VAR perception = 1
VAR anxiety = 1

// --- Relationship values (scale 0-5) ---
VAR rel_gateway_friend = 2

// --- Story flags ---
VAR has_seen_aurora = false
VAR has_returned_to_clearing = false
VAR chose_shortcut = false
VAR spoke_to_kiosk_woman = false

// --- Copper exposure tracker ---
// Increments with proximity to the phenomenon. Effects at thresholds.
VAR copper_exposure = 0

// --- Inventory / state ---
VAR has_cigarette = false
VAR time_of_day = "evening"
