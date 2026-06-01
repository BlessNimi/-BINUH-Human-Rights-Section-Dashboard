import pandas as pd

MONTH_TO_Q = {
    "January":"Q1","February":"Q1","March":"Q1",
    "April":"Q2","May":"Q2","June":"Q2",
    "July":"Q3","August":"Q3","September":"Q3",
    "October":"Q4","November":"Q4","December":"Q4",
}
MONTHS = ["January","February","March","April","May","June",
          "July","August","September","October","November","December"]

# ── Report_6.0 ──────────────────────────────────────────────────────────────
df = pd.read_csv(r"C:\Users\jbles\OneDrive - United Nations\Report_6.0.csv",
                 encoding="utf-8", encoding_errors="replace")
inc_col = [c for c in df.columns if "incident" in c.lower()][0]
VMAP = {"Meurtre":"Killed","Blessure":"Injured","Kidnapping":"Abducted"}
df["violation"] = df[inc_col].map(VMAP)
df["year"] = pd.to_numeric(df["Year"], errors="coerce").astype("Int64")
df["quarter"] = df["Month"].map(MONTH_TO_Q)
df["cnt"] = pd.to_numeric(df["Count"], errors="coerce").fillna(0)

perp_col = [c for c in df.columns if "auteur" in c.lower()][0]

def norm_perp(p):
    if pd.isna(p) or str(p).strip()=="": return "Unknown"
    p = str(p).strip().lower()
    if "gang" in p: return "Gangs"
    if "pnh" in p or "police" in p or "security" in p: return "PNH / HNP"
    if "population" in p or "justice" in p: return "Community / Justice Actors"
    return "Unknown"

df["perp"] = df[perp_col].apply(norm_perp)

main = df[df["violation"].isin(["Killed","Injured","Abducted"])].copy()

print("=== REPORT_6.0 — Available year/quarter combos ===")
print(main.groupby(["year","quarter"])["cnt"].sum().to_string())

print("\n=== Perpetrator raw values (unique) ===")
print(df[perp_col].dropna().unique())

# Find primary quarter (most recent)
yr_q = main.groupby(["year","quarter"])["cnt"].sum()
primary_year, primary_q = yr_q.index[-1]
print(f"\n=== Primary period: {primary_q} {primary_year} ===")

cur = main[(main["year"]==primary_year) & (main["quarter"]==primary_q)]
prev_q = {"Q1":"Q4","Q2":"Q1","Q3":"Q2","Q4":"Q3"}[primary_q]
prev_y = primary_year-1 if primary_q=="Q1" else primary_year
prev = main[(main["year"]==prev_y) & (main["quarter"]==prev_q)]

def show(label, sub):
    print(f"\n--- {label} ---")
    print(f"Total victims : {int(sub['cnt'].sum())}")
    print(f"Killed        : {int(sub[sub['violation']=='Killed']['cnt'].sum())}")
    print(f"Injured       : {int(sub[sub['violation']=='Injured']['cnt'].sum())}")
    print(f"Abducted      : {int(sub[sub['violation']=='Abducted']['cnt'].sum())}")
    print(f"Incidents     : {len(sub)}")

show(f"Current {primary_q} {primary_year}", cur)
show(f"Previous {prev_q} {prev_y}", prev)

print(f"\n=== By perpetrator — {primary_q} {primary_year} ===")
print(cur.groupby("perp")["cnt"].sum().to_string())

# Gender cols
g_col = [c for c in df.columns if "filles" in c.lower()][0]
b_col = [c for c in df.columns if "gar" in c.lower()][0]
w_col = [c for c in df.columns if "femmes18" in c.lower()][0]
m_col = [c for c in df.columns if "hommes18" in c.lower() and "âgées" not in c.lower()][0]
ew_col = [c for c in df.columns if "âgées" in c.lower() and "femmes" in c.lower()][0]
em_col = [c for c in df.columns if "âgées" in c.lower() and "hommes" in c.lower()][0]

for c in [g_col,b_col,w_col,m_col,ew_col,em_col]:
    cur[c] = pd.to_numeric(cur[c], errors="coerce").fillna(0)

print(f"\n=== Gender — {primary_q} {primary_year} ===")
print(f"Girls (0-17)    : {int(cur[g_col].sum())}")
print(f"Boys  (0-17)    : {int(cur[b_col].sum())}")
print(f"Women (18-59)   : {int(cur[w_col].sum())}")
print(f"Men   (18-59)   : {int(cur[m_col].sum())}")
print(f"Elderly Women   : {int(cur[ew_col].sum())}")
print(f"Elderly Men     : {int(cur[em_col].sum())}")

print(f"\n=== Monthly breakdown — {primary_q} {primary_year} ===")
for m in MONTHS:
    sub = cur[cur["Month"]==m]
    if len(sub):
        print(f"  {m:12s}: K={int(sub[sub['violation']=='Killed']['cnt'].sum())}  I={int(sub[sub['violation']=='Injured']['cnt'].sum())}  A={int(sub[sub['violation']=='Abducted']['cnt'].sum())}")

print(f"\n=== By commune (top 10) — {primary_q} {primary_year} ===")
com_col = [c for c in df.columns if "admin2" in c.lower()][0]
cur2 = cur.copy(); cur2["commune"] = df.loc[cur.index, com_col].fillna("Unknown")
print(cur2.groupby("commune")["cnt"].sum().sort_values(ascending=False).head(10).to_string())

print(f"\n=== Quarterly trend (all) ===")
for (y,q), sub in main.groupby(["year","quarter"]):
    print(f"  {q} {y}: total={int(sub['cnt'].sum())}  K={int(sub[sub['violation']=='Killed']['cnt'].sum())}  I={int(sub[sub['violation']=='Injured']['cnt'].sum())}  A={int(sub[sub['violation']=='Abducted']['cnt'].sum())}")

# ── MARA_6.0 ────────────────────────────────────────────────────────────────
print("\n\n=== MARA_6.0 ===")
mara = pd.read_csv(r"C:\Users\jbles\OneDrive - United Nations\MARA_6.0.csv",
                   encoding="utf-8", encoding_errors="replace")
# drop summary/blank rows
mara = mara[mara["Year"].notna() & (mara["Year"].astype(str).str.strip()!="")].copy()
mara["year"] = pd.to_numeric(mara["Year"], errors="coerce").astype("Int64")
mara["quarter"] = mara["Month"].map(MONTH_TO_Q)
mara["cnt"] = pd.to_numeric(mara["Sum of # of Victims"], errors="coerce").fillna(0)

viol_col = "Type of Sexual Violence"
perp_col2 = "Perpetrator Category"
sex_col  = "Victim's Sex"

print("Violence types:", mara[viol_col].unique())
print("Perpetrators:", mara[perp_col2].unique())
print("Sex:", mara[sex_col].unique())

print("\n=== MARA year/quarter totals ===")
print(mara.groupby(["year","quarter"])["cnt"].sum().to_string())

print(f"\n=== MARA {primary_q} {primary_year} ===")
mara_cur = mara[(mara["year"]==primary_year) & (mara["quarter"]==primary_q)]
print(f"Total: {int(mara_cur['cnt'].sum())}")
print("By type:")
print(mara_cur.groupby(viol_col)["cnt"].sum().to_string())
print("By perpetrator:")
print(mara_cur.groupby(perp_col2)["cnt"].sum().to_string())
print("By sex:")
print(mara_cur.groupby(sex_col)["cnt"].sum().to_string())

# Age
minor_col = [c for c in mara.columns if "minor" in c.lower() or "0 - 17" in c.lower()][0]
adult_col = [c for c in mara.columns if "18 - 59" in c.lower() or "adult" in c.lower()][0]
for c in [minor_col, adult_col]:
    mara_cur[c] = pd.to_numeric(mara_cur[c], errors="coerce").fillna(0)
print(f"Minors (0-17): {int(mara_cur[minor_col].sum())}")
print(f"Adults (18-59): {int(mara_cur[adult_col].sum())}")

print("\n=== MARA quarterly trend ===")
for (y,q), sub in mara.groupby(["year","quarter"]):
    print(f"  {q} {y}: total={int(sub['cnt'].sum())}  Rape={int(sub[sub[viol_col]=='Rape']['cnt'].sum())}  CollectiveRape={int(sub[sub[viol_col]=='Collective Rape']['cnt'].sum())}")

print("\n=== MARA by commune — current quarter ===")
com2_col = [c for c in mara.columns if "admin2" in c.lower() or "commune" in c.lower()][0]
mara_cur2 = mara_cur.copy()
mara_cur2["commune"] = mara_cur2[com2_col].fillna("Unknown")
print(mara_cur2.groupby("commune")["cnt"].sum().sort_values(ascending=False).to_string())
