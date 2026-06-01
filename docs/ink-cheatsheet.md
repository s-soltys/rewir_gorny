# Ink Cheatsheet

Quick syntax reference for writing Ink stories. See the [full docs](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md) for details.

---

## Knots & Stitches

Knots are major sections. Stitches are subsections within knots.

```ink
=== podworko ===
Stoisz na podwórku. Beton pęka pod stopami.
-> wybory_podworko

= przy_drzwiach
Podchodzisz do drzwi.
```

Divert to a knot: `-> podworko`
Divert to a stitch: `-> podworko.przy_drzwiach`

---

## Choices

`*` — single-use choice (disappears after picking):
```ink
* Otwierasz drzwi.
  Skrzypią.
* Pukasz.
  Cisza.
```

`+` — sticky choice (stays available):
```ink
+ Rozglądasz się.
  Nic się nie zmieniło.
```

**Suppressed text** — text in `[]` is shown in the choice but not after selecting:

```ink
* "Skąd [pan jest]jesteś?" — pytasz.
```
Choice shows: `"Skąd pan jest?"`
After picking: `"Skąd jesteś?" — pytasz.`

**Nested choices:**
```ink
* Podchodzisz do okna.
  ** Otwierasz je.
  ** Patrzysz przez szybę.
```

---

## Diverts

```ink
-> nazwa_knota           // jump to knot
-> nazwa_knota.stitch    // jump to stitch
-> END                   // end the story
-> DONE                  // end current thread/tunnel
```

---

## Variables

```ink
VAR imie = "Marek"
VAR sila = 3
VAR widzial_zdjecie = false

~ sila = sila + 1
~ widzial_zdjecie = true
```

---

## Conditionals

**Inline:**
```ink
{widzial_zdjecie: Zdjęcie nie daje ci spokoju.|Nic tu nie ma.}
```

**Block:**
```ink
{
  - sila > 5:
    Wyrywasz drzwi z zawiasów.
  - sila > 2:
    Drzwi ustępują po trzecim kopnięciu.
  - else:
    Drzwi się nie ruszają. Ty też nie.
}
```

**Choice conditionals:**
```ink
* {widzial_zdjecie} "Co z tym zdjęciem?"
* {not widzial_zdjecie} Nic nie zwraca twojej uwagi.
```

---

## Tags

Tags attach metadata to lines. Access them in the engine via `currentTags`.

```ink
To jest tekst. # mood: melancholy # sfx: rain
```

---

## INCLUDEs

Split your story across files:

```ink
INCLUDE postacie.ink
INCLUDE lokacje/podworko.ink
```

Paths are relative to the file containing the `INCLUDE`.

---

## Functions

```ink
=== function losuj_opis() ===
~ temp r = RANDOM(1, 3)
{
  - r == 1: szary
  - r == 2: brudny
  - r == 3: pęknięty
}
```

Usage: `Widzisz {losuj_opis()} mur.`

---

## Tunnels

Tunnels divert somewhere and return:

```ink
-> wspomnienie ->
Wracasz do rzeczywistości.

=== wspomnienie ===
Przez chwilę widzisz kuchnię babci.
->->
```

---

## Quick Tips

- Use `TODO:` comments for notes: `// TODO: dodać opis pokoju`
- Use `{knot_name}` to check visit count: `{podworko > 2: Znowu tu jesteś.}`
- Glue `<>` joins lines without a line break
- `~` at line start for logic-only lines (no output)
