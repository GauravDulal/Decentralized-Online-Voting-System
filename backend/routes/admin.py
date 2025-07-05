from flask import Blueprint, request, render_template, redirect, url_for, flash, session
from backend.services.database import get_admin_by_username
from werkzeug.security import check_password_hash

admin_bp = Blueprint("admin", __name__)


@admin_bp.route("/adminsignin", methods=["GET", "POST"])
def adminsignin():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        user = get_admin_by_username(username)

        if user:
            print("ADMIN USER DATA:", user)

        if user and check_password_hash(user['Apass'], password):
            session["admin"] = {
                "username": user['Aname'],
            }
            flash("Admin login successful", "success")
            return redirect(url_for("admin.admin_home"))
        else:
            flash("Invalid admin credentials", "error")

    return render_template("admin_signin.html")


@admin_bp.route('/admin')
def admin_home():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))
    return render_template('admin_home.html', admin=session["admin"])


@admin_bp.route('/addcampaign')
def addcampaign():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))
    return render_template('add_campaign.html', admin=session["admin"])


@admin_bp.route('/viewcampaign')
def viewcampaign():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))
    return render_template('viewcampaign.html', admin=session["admin"])


@admin_bp.route('/viewresult')
def viewresult():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))
    return render_template('viewresult.html', admin=session["admin"])


@admin_bp.route('/viewcandidates')
def viewcandidates():
    if "admin" not in session:
        return redirect(url_for("admin.adminsignin"))
    return render_template('viewcandidates.html', admin=session["admin"])


@admin_bp.route("/adminlogout")
def adminlogout():
    session.pop("admin", None)
    flash("Admin logged out successfully", "info")
    return redirect(url_for("admin.adminsignin"))
