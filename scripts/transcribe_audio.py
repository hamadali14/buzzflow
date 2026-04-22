import json
import re
import sys
import whisper

if len(sys.argv) < 2:
    print(json.dumps({"success": False, "error": "Missing audio path"}))
    sys.exit(1)

audio_path = sys.argv[1]
model_name = sys.argv[2] if len(sys.argv) > 2 else "small"

def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").strip())

def score_text(text: str) -> int:
    text = clean_text(text).lower()

    if not text:
        return -999

    score = 0

    swedish_hits = [
        "och", "det", "är", "för", "med", "som", "att", "hej", "offert",
        "kronor", "kr", "svenska", "tack", "ligger", "heiter", "heter"
    ]

    english_hits = [
        "the", "and", "is", "for", "with", "offer", "price", "hello",
        "thank", "english"
    ]

    for word in swedish_hits:
        if word in text:
            score += 3

    for word in english_hits:
        if word in text:
            score -= 3

    for char in ["å", "ä", "ö"]:
        if char in text:
            score += 4

    words = text.split()
    if len(words) >= 3:
        score += 2

    return score

try:
    model = whisper.load_model(model_name)

    sv_result = model.transcribe(
        audio_path,
        language="sv",
        task="transcribe",
        fp16=False,
        temperature=0,
        condition_on_previous_text=True,
        initial_prompt="Detta är svenska. Prioritera svensk transkribering, svenska namn, svenska siffror, priser i kronor och svensk meningsbyggnad."
    )

    en_result = model.transcribe(
        audio_path,
        language="en",
        task="transcribe",
        fp16=False,
        temperature=0,
        condition_on_previous_text=True,
        initial_prompt="This may contain some English, but Swedish should only lose if English is clearly much better."
    )

    sv_text = clean_text(sv_result.get("text") or "")
    en_text = clean_text(en_result.get("text") or "")

    sv_score = score_text(sv_text)
    en_score = score_text(en_text)

    chosen_language = "sv"
    chosen_text = sv_text

    if not sv_text and en_text:
        chosen_language = "en"
        chosen_text = en_text
    elif en_score > sv_score + 4:
        chosen_language = "en"
        chosen_text = en_text

    print(json.dumps({
        "success": True,
        "text": chosen_text,
        "language": chosen_language,
        "sv_prob": 1.0 if chosen_language == "sv" else 0.0,
        "en_prob": 1.0 if chosen_language == "en" else 0.0,
        "sv_text": sv_text,
        "en_text": en_text,
        "sv_score": sv_score,
        "en_score": en_score
    }))
except Exception as e:
    print(json.dumps({
        "success": False,
        "error": str(e)
    }))
    sys.exit(1)
