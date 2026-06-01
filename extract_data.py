#!/usr/bin/env python3
"""BINUH HR — Report_6.0.csv + MARA_6.0.csv -> js/data.js. Run: python3 extract_data.py"""
import json
import os
from datetime import datetime

import pandas as pd

BASE = os.path.dirname(__file__)
CSV      = r"C:\Users\jbles\OneDrive - United Nations\Report_6.0.csv"
MARA_CSV = r"C:\Users\jbles\OneDrive - United Nations\MARA_6.0.csv"
OUT = os.path.join(BASE, "js", "data.js")

PRIMARY_YEAR    = 2026
PRIMARY_QUARTER = "Q1"

VIOLATIONS   = ["Killed", "Injured", "Abducted"]
VIOLATION_MAP = {"Meurtre": "Killed", "Blessure": "Injured", "Kidnapping": "Abducted"}
MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]
MONTH_TO_Q = {
    "January":"Q1","February":"Q1","March":"Q1",
    "April":"Q2","May":"Q2","June":"Q2",
    "July":"Q3","August":"Q3","September":"Q3",
    "October":"Q4","November":"Q4","December":"Q4",
}
PERPS = ["Gangs", "PNH / HNP", "Population Justice", "Unknown"]

CENTROIDS = {
    "Port-au-Prince": (18.547327, -72.3395928),
    "Delmas": (18.5553727, -72.3063117),
    "Cite Soleil": (18.5937745, -72.3102812),
    "Cité Soleil": (18.5937745, -72.3102812),
    "Croix-Des-Bouquets": (18.7306286, -72.3083562),
    "Croix-des-Bouquets": (18.7306286, -72.3083562),
    "Petion-Ville": (18.4838989, -72.3157059),
    "Pétion-Ville": (18.4838989, -72.3157059),
    "Tabarre": (18.5958321, -72.2845644),
    "Cabaret": (18.7343259, -72.4181932),
    "Kenscoff": (18.3717337, -72.2862809),
    "Gressier": (18.5441194, -72.4766886),
    "Carrefour": (18.5399097, -72.400102),
    "L'Estere": (19.3667591, -72.5728224),
    "L'Estère": (19.3667591, -72.5728224),
    "Arcahaie": (18.7704469, -72.489741),
    "Gros Morne": (19.6744559, -72.6334068),
    "Mirebalais": (18.7410098, -72.0082473),
    "Dessalines": (19.1814002, -72.599987),
    "Gonaives": (19.4460597, -72.6884336),
    "Gonaïves": (19.4460597, -72.6884336),
    "Belladere": (18.8660303, -71.7636303),
    "Belladère": (18.8660303, -71.7636303),
    "Liancourt": (19.12403177, -72.53551313),
    "Petite Riviere de l'Artibonite": (19.1831952, -72.5522013),
    "Petite Rivière de l'Artibonite": (19.1831952, -72.5522013),
    "Saint-Marc": (18.9945285, -72.6934054),
}


def col(df, *parts):
    for c in df.columns:
        if all(p.lower() in c.lower() for p in parts):
            return c
    raise KeyError(parts)


def norm_perp(p):
    if pd.isna(p) or str(p).strip() == "":
        return "Unknown"
    s = str(p).strip().lower()
    if "gang" in s:
        return "Gangs"
    if "pnh" in s or "hnp" in s or "police" in s:
        return "PNH / HNP"
    if "population" in s or "justice" in s or "membres" in s:
        return "Population Justice"
    return "Unknown"


def norm_mara_perp(p):
    if pd.isna(p) or str(p).strip() == "":
        return "Unknown"
    s = str(p).strip().lower()
    if "gang" in s:
        return "Gangs"
    if "pnh" in s or "hnp" in s or "police" in s:
        return "PNH / HNP"
    if "autod" in s or "self" in s or "defence" in s or "defense" in s:
        return "Self-Defence Group"
    return "Unknown"


def load_df():
    df = pd.read_csv(CSV, encoding="utf-8", encoding_errors="replace")
    c_inc  = col(df, "incident")
    c_com  = col(df, "Admin2")
    c_perp = col(df, "Auteur")

    df = df.rename(columns={
        c_inc: "violation_raw",
        c_com: "commune",
        c_perp: "perpetrator",
        "lat_y": "lat",
        "lon_x": "lon",
    })
    df["commune"] = df["commune"].apply(lambda x: str(x).strip() if pd.notna(x) else "Unknown")
    df["violation"] = df["violation_raw"].map(VIOLATION_MAP)
    df = df[df["violation"].isin(VIOLATIONS)].copy()
    df["quarter"] = df["Month"].map(MONTH_TO_Q).fillna("")
    df["perpetrator"] = df["perpetrator"].apply(norm_perp)
    df["year"] = pd.to_numeric(df["Year"], errors="coerce").astype("Int64")
    df["victims"] = pd.to_numeric(df["Count"], errors="coerce").fillna(0).astype(int)

    g_col  = col(df, "Filles")
    b_col  = col(df, "Garcons") if any("arcon" in c for c in df.columns) else col(df, "gar")
    w_col  = col(df, "Femmes18")
    m_col  = col(df, "Hommes18")
    ew_col = col(df, "gees", "Femmes") if any("gees" in c.lower() for c in df.columns) else col(df, "âgées", "Femmes")
    em_col = col(df, "gees", "Hommes") if any("gees" in c.lower() for c in df.columns) else col(df, "âgées", "Hommes")

    for c in [g_col, b_col, w_col, m_col, ew_col, em_col]:
        df[c] = pd.to_numeric(df[c], errors="coerce").fillna(0)
    df["boys"]   = df[b_col]
    df["girls"]  = df[g_col]
    df["male"]   = df[m_col] + df[em_col]
    df["female"] = df[w_col] + df[ew_col]
    df["lat"] = pd.to_numeric(df["lat"], errors="coerce")
    df["lon"] = pd.to_numeric(df["lon"], errors="coerce")
    return df


def load_mara():
    mara = pd.read_csv(MARA_CSV, encoding="utf-8", encoding_errors="replace")
    mara.columns = [c.strip() for c in mara.columns]
    mara = mara[mara["Year"].notna() & (mara["Year"].astype(str).str.strip() != "")].copy()
    mara["year"]       = pd.to_numeric(mara["Year"], errors="coerce").astype("Int64")
    mara["quarter"]    = mara["Month"].map(MONTH_TO_Q).fillna("")
    mara["cnt"]        = pd.to_numeric(mara["Sum of # of Victims"], errors="coerce").fillna(0)
    mara["minor"]      = pd.to_numeric(mara["Minor0 - 17"], errors="coerce").fillna(0)
    mara["adult"]      = pd.to_numeric(mara["Adults18 - 59"], errors="coerce").fillna(0)
    mara["perpetrator"] = mara["Perpetrator Category"].apply(norm_mara_perp)
    com_col = col(mara, "Admin2")
    mara["commune"] = mara[com_col].fillna("Unknown").apply(lambda x: str(x).strip())
    return mara


def agg_slice(sub):
    total = int(sub["victims"].sum())
    out = {
        "total": total,
        "incidents": len(sub),
        "killed":   int(sub.loc[sub["violation"] == "Killed",   "victims"].sum()),
        "injured":  int(sub.loc[sub["violation"] == "Injured",  "victims"].sum()),
        "abducted": int(sub.loc[sub["violation"] == "Abducted", "victims"].sum()),
        "gender": {
            "male":   int(sub["male"].sum()),
            "female": int(sub["female"].sum()),
            "boys":   int(sub["boys"].sum()),
            "girls":  int(sub["girls"].sum()),
        },
        "by_age": {
            "minor":   int(sub["boys"].sum() + sub["girls"].sum()),
            "adult":   0,
            "elderly": 0,
        },
        "by_perpetrator": {},
        "by_violation_gender": {},
    }
    w_col  = [c for c in sub.columns if "Femmes18" in c]
    m_col  = [c for c in sub.columns if "Hommes18" in c and "g" not in c.lower().replace("hommes","")]
    ew_col = [c for c in sub.columns if ("gées" in c or "gees" in c.lower()) and "Femmes" in c]
    em_col = [c for c in sub.columns if ("gées" in c or "gees" in c.lower()) and "Hommes" in c]
    if w_col and m_col:
        out["by_age"]["adult"] = int(sub[w_col[0]].sum() + sub[m_col[0]].sum())
    if ew_col and em_col:
        out["by_age"]["elderly"] = int(sub[ew_col[0]].sum() + sub[em_col[0]].sum())

    for p, g in sub.groupby("perpetrator"):
        out["by_perpetrator"][p] = int(g["victims"].sum())
    for v in VIOLATIONS:
        vs = sub[sub["violation"] == v]
        out["by_violation_gender"][v.lower()] = {
            "male":   int(vs["male"].sum()),
            "female": int(vs["female"].sum()),
            "boys":   int(vs["boys"].sum()),
            "girls":  int(vs["girls"].sum()),
        }
    return out


def agg_mara_slice(sub):
    viol_col = "Type of Sexual Violence"
    return {
        "total":          int(sub["cnt"].sum()),
        "rape":           int(sub.loc[sub[viol_col].str.strip() == "Rape",           "cnt"].sum()),
        "collective_rape":int(sub.loc[sub[viol_col].str.strip() == "Collective Rape","cnt"].sum()),
        "by_perpetrator": {p: int(g["cnt"].sum()) for p, g in sub.groupby("perpetrator")},
        "gender": {
            "female": int(sub.loc[sub["Victim's Sex"] == "Female", "cnt"].sum()),
            "male":   int(sub.loc[sub["Victim's Sex"] == "Male",   "cnt"].sum()),
        },
        "by_age": {
            "minor": int(sub["minor"].sum()),
            "adult": int(sub["adult"].sum()),
        },
        "by_commune": {c: int(g["cnt"].sum()) for c, g in sub.groupby("commune") if c and c != "Unknown"},
    }


def period_filter(df, year, quarter):
    return df[(df["year"] == year) & (df["quarter"] == quarter)]


def build_locations(df):
    locs = []
    for (lat, lon, com, viol, perp), g in df.groupby(
        ["lat", "lon", "commune", "violation", "perpetrator"], dropna=False
    ):
        latf = float(lat) if pd.notna(lat) else CENTROIDS.get(com, (None, None))[0]
        lonf = float(lon) if pd.notna(lon) else CENTROIDS.get(com, (None, None))[1]
        if latf is None:
            continue
        locs.append({
            "lat": latf, "lon": lonf,
            "commune": com, "violation": viol.lower(), "perpetrator": perp,
            "victims": int(g["victims"].sum()), "incidents": len(g),
            "year": int(g["year"].iloc[0]), "quarter": g["quarter"].iloc[0],
            "months": sorted(g["Month"].dropna().unique().tolist()),
        })
    return locs


def main():
    df   = load_df()
    mara = load_mara()

    cur  = period_filter(df, PRIMARY_YEAR, PRIMARY_QUARTER)
    prev_q = {"Q1": "Q4", "Q2": "Q1", "Q3": "Q2", "Q4": "Q3"}[PRIMARY_QUARTER]
    prev_y = PRIMARY_YEAR - 1 if PRIMARY_QUARTER == "Q1" else PRIMARY_YEAR
    prev   = period_filter(df, prev_y, prev_q)

    # Quarterly trend (main violations)
    quarterly_trend = []
    for year in sorted(df["year"].dropna().unique()):
        for q in ["Q1", "Q2", "Q3", "Q4"]:
            sub = period_filter(df, int(year), q)
            if len(sub) == 0:
                continue
            a = agg_slice(sub)
            quarterly_trend.append({
                "year": int(year), "quarter": q, "label": f"{q} {int(year)}",
                **{k: a[k] for k in ["total", "killed", "injured", "abducted", "incidents"]},
            })

    # Monthly (current quarter)
    monthly = {}
    if len(cur):
        for m in MONTHS:
            sub = cur[cur["Month"] == m]
            if len(sub):
                monthly[m] = agg_slice(sub)

    # MARA current quarter
    mara_cur  = period_filter(mara, PRIMARY_YEAR, PRIMARY_QUARTER)
    mara_prev = period_filter(mara, prev_y, prev_q)

    # MARA monthly (current quarter)
    mara_monthly = {}
    if len(mara_cur):
        for m in MONTHS:
            sub = mara_cur[mara_cur["Month"] == m]
            if len(sub):
                mara_monthly[m] = agg_mara_slice(sub)

    # MARA quarterly trend
    mara_trend = []
    for (year, q), sub in mara.groupby(["year", "quarter"]):
        viol_col = "Type of Sexual Violence"
        mara_trend.append({
            "year": int(year), "quarter": q, "label": f"{q} {int(year)}",
            "total":          int(sub["cnt"].sum()),
            "rape":           int(sub.loc[sub[viol_col].str.strip() == "Rape",           "cnt"].sum()),
            "collective_rape":int(sub.loc[sub[viol_col].str.strip() == "Collective Rape","cnt"].sum()),
        })
    mara_trend.sort(key=lambda x: (x["year"], x["quarter"]))

    month_labels = {
        "Q1": "January - March", "Q2": "April - June",
        "Q3": "July - September", "Q4": "October - December",
    }

    data = {
        "meta": {
            "mission": "BINUH",
            "title": "Violence Affecting Civilians Dashboard",
            "primary_year": PRIMARY_YEAR,
            "primary_quarter": PRIMARY_QUARTER,
            "period_label": f"{PRIMARY_QUARTER} {PRIMARY_YEAR} - {month_labels.get(PRIMARY_QUARTER, '')}",
            "source": "BINUH Human Rights - Incident Database (Report 6.0)",
            "generated_at": datetime.now().isoformat(timespec="seconds"),
        },
        "current":  agg_slice(cur)  if len(cur)  else agg_slice(df.iloc[:0]),
        "previous": agg_slice(prev) if len(prev) else None,
        "quarterly_trend": quarterly_trend,
        "monthly": monthly,
        "by_commune":    {c: agg_slice(g) for c, g in cur.groupby("commune") if c},
        "by_perpetrator":{p: agg_slice(g) for p, g in cur.groupby("perpetrator")},
        "locations":     build_locations(cur),
        "all_locations": build_locations(df),
        "data_quality": {
            "missing_coords":  int((cur["lat"].isna() | cur["lon"].isna()).sum()) if len(cur) else 0,
            "unknown_commune": int((cur["commune"] == "Unknown").sum()) if len(cur) else 0,
        },
        "mara": {
            "current":        agg_mara_slice(mara_cur)  if len(mara_cur)  else {},
            "previous":       agg_mara_slice(mara_prev) if len(mara_prev) else None,
            "quarterly_trend": mara_trend,
            "monthly":        mara_monthly,
            "by_commune": {c: int(g["cnt"].sum()) for c, g in mara_cur.groupby("commune") if c and c != "Unknown"},
        },
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("/* Auto-generated — do not edit */\nconst BINUH_DATA = ")
        f.write(json.dumps(data, indent=2, ensure_ascii=False))
        f.write(";\n")

    c = data["current"]
    m = data["mara"]["current"]
    print(f"OK: {c['incidents']} incidents, {c['total']} victims ({PRIMARY_QUARTER} {PRIMARY_YEAR})")
    print(f"    Killed {c['killed']} | Injured {c['injured']} | Abducted {c['abducted']}")
    print(f"    MARA: {m.get('total', 0)} (Rape {m.get('rape', 0)} | Collective Rape {m.get('collective_rape', 0)})")
    print(f"-> {OUT}")


if __name__ == "__main__":
    main()
