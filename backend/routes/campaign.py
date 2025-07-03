from flask import Blueprint, render_template, session, redirect, url_for
from backend.services.database import get_all_campaigns, get_candidates_by_campaign

campaign_bp = Blueprint("campaign", __name__)

@campaign_bp.route('/')
def campaigns():
    if "user" not in session:
        return redirect(url_for('auth.signin'))
    campaigns = get_all_campaigns()
    return render_template('campaign.html', campaigns=campaigns)

@campaign_bp.route('/<int:campaign_id>/candidates')
def candidates(campaign_id):
    if "user" not in session:
        return redirect(url_for('auth.signin'))
    candidates = get_candidates_by_campaign(campaign_id)
    return render_template('candidates.html', candidates=candidates, campaign_id=campaign_id)
