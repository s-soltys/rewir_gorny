=== loc_street ===
# scene: street

speaker: narrator
The concrete slabs of the pavement are cracked. The air tastes faintly metallic.
-> END

=== knot_weirdo ===
speaker: weirdo
The copper... the copper is rising...

*   { inventory ? strange_coin } [Show him the strange coin]
    speaker: player
    Do you know anything about this? My parents found it.
    speaker: weirdo
    Ah! A relic! The old currency of the deep mines! Keep it safe, kid. It wards off the hum.
    ~ quest_side = "Quest Complete: Showed coin to weirdo."
    -> END

*   [Ask him what he means]
    speaker: player
    What copper?
    speaker: weirdo
    You'll see in the woods... you'll see.
    -> END

*   [Leave him alone]
    -> END

=== knot_street_to_forest ===
-> loc_forest
