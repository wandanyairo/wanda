# Wanda's Quiz — Results Cheat Sheet

## Step 1: Export the data

Run this in the Supabase SQL Editor, then click the download arrow in the results panel:

```sql
select * from submissions order by submitted_at asc;
```

---

## Step 2: Scores (automated)

Scores are stored automatically in the `score` column out of **18 points**.

| Question | Max points | How scored |
|---|---|---|
| Favourite fruit | 1 | Contains "apple" or "granny smith" |
| Rank glasses | 6 | 1 pt per glass in the correct position |
| Rank wines | 5 | 1 pt per wine in the correct position |
| Rank cheeses | 5 | 1 pt per cheese in the correct position |
| Veggie she hates | 1 | Exact match: Olives |

**The `score_breakdown` column** shows points per question, e.g.:
`{"veggie": 1, "rank-wines": 3, "rank-glasses": 4, "rank-cheeses": 2, "favourite-fruit": 1}`

To rank everyone by score, run:
```sql
select submitted_at, score, score_breakdown from submissions order by score desc;
```

---

## Step 3: Correct answers (for manual reveal)

- **Favourite fruit:** Green apple / Granny Smith apple
- **Rank glasses:** Angular Goblet → Rounded Goblet → Stemless → Wine Cooler Mug → Mug → Short Thick Stem
- **Rank wines:** Rosé → Riesling → Pinot Grigio → Chilled Malbec → Pinot Noir
- **Rank cheeses:** Feta → Parmesan → Cheddar → Brie → Gruyère
- **Veggie she hates:** Olives

---

## Step 4: Group insights

### Grape debate — Green vs Red split
```sql
select
  score_breakdown->>'grape-debate' as choice,
  count(*) as votes
from submissions
group by choice;
```
*(The `grape_debate` column stores `{"choice": "Green", "why": "..."}` — use the why's for fun quotes to read aloud)*

### Cities — where people joined from
```sql
select city, count(*) as count from submissions group by city order by count desc;
```

### Wine identity — fun to read aloud
The `wine_self` column stores `{"wine": "...", "why": "..."}`. Read the "why" answers aloud and have people guess whose is whose.

### Scamfluencer — read aloud
The `scamfluencer` column. Great for reading aloud anonymously and having people guess.

### Advice & wishes — read aloud
`advice` and `wishes` columns. Consider grouping by age (under 30 vs over 30 based on the `advice` answer tone).

---

## Step 5: Fun stats to announce

- 🏆 **Winner(s):** highest `score` out of 18
- 🤝 **Most common grape pick:** Green vs Red %
- 🌍 **Cities represented:** list from the city query
- 🍷 **Most agreed-on wine ranking:** any position where everyone got it right
