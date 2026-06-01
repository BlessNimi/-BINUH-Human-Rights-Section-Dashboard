import pandas as pd

MONTH_TO_Q = {
    "January":"Q1","February":"Q1","March":"Q1",
    "April":"Q2","May":"Q2","June":"Q2",
    "July":"Q3","August":"Q3","September":"Q3",
    "October":"Q4","November":"Q4","December":"Q4",
}
MONTHS = ["January","February","March","April","May","June",
          "July","August","September","October","November","December"]

mara = pd.read_csv(r"C:\Users\jbles\OneDrive - United Nations\MARA_6.0.csv",
                   encoding="utf-8", encoding_errors="replace")
mara.columns = [c.strip() for c in mara.columns]

# Use exact column names
viol_col  = "Type of Sexual Violence"
sex_col   = "Victim's Sex"
cnt_col   = "Sum of # of Victims"
perp_col  = "Perpetrator Category"
minor_col = "Minor0 - 17"
adult_col = "Adults18 - 59"
com_col   = "Commune (Admin2) de l'incident"

# Drop rows with no Year
mara = mara[mara["Year"].notna() & (mara["Year"].astype(str).str.strip()!="")].copy()
mara["year"] = pd.to_numeric(mara["Year"], errors="coerce").astype("Int64")
mara["quarter"] = mara["Month"].map(MONTH_TO_Q)
mara["cnt"] = pd.to_numeric(mara[cnt_col], errors="coerce").fillna(0)
mara[minor_col] = pd.to_numeric(mara[minor_col], errors="coerce").fillna(0)
mara[adult_col] = pd.to_numeric(mara[adult_col], errors="coerce").fillna(0)

print("=== MARA year/quarter totals ===")
print(mara.groupby(["year","quarter"])["cnt"].sum().to_string())

primary_year, primary_q = 2026, "Q1"
mara_cur = mara[(mara["year"]==primary_year) & (mara["quarter"]==primary_q)]
print(f"\n=== MARA {primary_q} {primary_year}: total={int(mara_cur['cnt'].sum())} ===")
print("By type:")
print(mara_cur.groupby(viol_col)["cnt"].sum().to_string())
print("By perpetrator:")
print(mara_cur.groupby(perp_col)["cnt"].sum().to_string())
print("By sex:")
print(mara_cur.groupby(sex_col)["cnt"].sum().to_string())
print(f"Minors: {int(mara_cur[minor_col].sum())}  Adults: {int(mara_cur[adult_col].sum())}")

print("\n=== MARA quarterly trend ===")
for (y,q), sub in mara.groupby(["year","quarter"]):
    rape = int(sub[sub[viol_col].str.strip()=="Rape"]["cnt"].sum())
    col_rape = int(sub[sub[viol_col].str.strip()=="Collective Rape"]["cnt"].sum())
    print(f"  {q} {int(y)}: total={int(sub['cnt'].sum())}  Rape={rape}  CollRape={col_rape}")

print("\n=== MARA by commune — Q1 2026 ===")
mara_cur2 = mara_cur.copy()
mara_cur2["commune"] = mara_cur2[com_col].fillna("Unknown")
print(mara_cur2.groupby("commune")["cnt"].sum().sort_values(ascending=False).to_string())

print("\n=== MARA monthly — all ===")
for m in MONTHS:
    sub = mara[mara["Month"]==m]
    if len(sub):
        print(f"  {m}: total={int(sub['cnt'].sum())}  Rape={int(sub[sub[viol_col]=='Rape']['cnt'].sum())}  CollRape={int(sub[sub[viol_col]=='Collective Rape']['cnt'].sum())}")

print("\n=== MARA by perp — all time ===")
print(mara.groupby(perp_col)["cnt"].sum().to_string())

print("\n=== MARA raw sample ===")
print(mara[["year","quarter","Month",viol_col,sex_col,"cnt",perp_col,minor_col,adult_col]].head(20).to_string())
