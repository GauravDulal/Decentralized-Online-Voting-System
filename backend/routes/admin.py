from flask import Blueprint, request, render_template, redirect, url_for, flash, session
from werkzeug.security import check_password_hash
from backend.services.database import (
    get_admin_by_username,
    create_campaign,
    get_all_campaigns,
    get_all_candidates,
    get_campaign_by_id,
    update_campaign,
    create_candidate,
    delete_candidate_by_id,
    delete_campaign_and_candidates,
)

admin_bp = Blueprint("admin", __name__)

# Admin Sign In
@admin_bp.route("/adminsignin", methods=["GET", "POST"])
def adminsignin():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        user = get_admin_by_username(username)

        if user and check_password_hash(user['Apass'], password):
            session["admin"] = {"username": user['Aname']}
            flash("Admin login successful", "success")
            return redirect(url_for("admin.admin_home"))
        else:
            flash("Invalid admin credentials", "error")

    return render_template("admin_signin.html")

# Admin Home
@admin_bp.route('/admin')
def admin_home():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))
    return render_template('admin_home.html', admin=session["admin"])

# Add Campaign
@admin_bp.route('/addcampaign', methods=['GET', 'POST'])
def addcampaign():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))

    if request.method == 'POST':
        name = request.form.get('name')
        description = request.form.get('description')

        try:
            create_campaign(name, description)
            flash("Campaign added successfully", "success")
            return redirect(url_for('admin.viewcampaign'))
        except Exception as e:
            print("Error adding campaign:", e)
            flash("Error adding campaign", "error")

    return render_template('add_campaign.html', admin=session["admin"])

# View All Campaigns
@admin_bp.route('/viewcampaign')
def viewcampaign():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))

    campaigns = get_all_campaigns()
    return render_template('viewcampaign.html', admin=session["admin"], campaigns=campaigns)

# Edit Campaign
@admin_bp.route('/editcampaign/<int:campaign_id>', methods=['GET', 'POST'])
def editcampaign(campaign_id):
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))

    campaign = get_campaign_by_id(campaign_id)
    if not campaign:
        flash("Campaign not found.", "error")
        return redirect(url_for('admin.viewcampaign'))

    if request.method == 'POST':
        name = request.form.get('name')
        description = request.form.get('description')
        status = request.form.get('status')

        update_campaign(campaign_id, name, description, status)
        flash("Campaign updated successfully!", "success")
        return redirect(url_for('admin.viewcampaign'))

    return render_template("editcampaign.html", campaign=campaign, admin=session["admin"])

# View Candidates
@admin_bp.route('/viewcandidates')
def viewcandidates():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))
    candidates = get_all_candidates()
    return render_template('viewcandidates.html', admin=session["admin"], candidates=candidates)

# View Results (Stub)
@admin_bp.route('/viewresult')
def viewresult():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))
    return render_template('viewresult.html', admin=session["admin"])

# Admin Logout
@admin_bp.route("/adminlogout")
def adminlogout():
    session.pop("admin", None)
    flash("Admin logged out successfully", "info")
    return redirect(url_for("admin.adminsignin"))

@admin_bp.route('/addcandidate', methods=['GET', 'POST'])
def addcandidate():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))

    campaigns = get_all_campaigns()

    if request.method == 'POST':
        candidate_id = request.form.get('id')  # optional
        name = request.form.get('name')
        wallet_address = request.form.get('wallet_address')
        campaign_id = request.form.get('campaign_id')

        try:
            create_candidate(candidate_id, name, wallet_address, campaign_id)
            flash("Candidate added successfully", "success")
            return redirect(url_for('admin.viewcandidates'))
        except Exception as e:
            print("Error adding candidate:", e)
            flash("Error adding candidate", "error")

    return render_template('add_candidate.html', admin=session["admin"], campaigns=campaigns)

@admin_bp.route('/deletecandidate/<int:candidate_id>', methods=['POST'])
def deletecandidate(candidate_id):
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))

    try:
        delete_candidate_by_id(candidate_id)
        flash("Candidate deleted successfully.", "success")
    except Exception as e:
        print("Error deleting candidate:", e)
        flash("Error deleting candidate.", "error")

    return redirect(url_for("admin.viewcandidates"))

@admin_bp.route('/deletecampaign/<int:campaign_id>', methods=['POST'])
def deletecampaign(campaign_id):
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))

    try:
        delete_campaign_and_candidates(campaign_id)
        flash("Campaign and its candidates deleted successfully.", "success")
    except Exception as e:
        print("Error deleting campaign:", e)
        flash("Error deleting campaign.", "error")

    return redirect(url_for('admin.viewcampaign'))