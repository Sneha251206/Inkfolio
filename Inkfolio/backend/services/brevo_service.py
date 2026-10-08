import json
import urllib.request
import urllib.error
from config import settings

def send_password_reset_email(to_email: str, to_name: str, reset_url: str) -> bool:
    """
    Sends a transactional password reset email using the Brevo (formerly Sendinblue) REST API.
    Endpoint: https://api.brevo.com/v3/smtp/email
    """
    api_key = settings.BREVO_API_KEY.strip()

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf9f6; margin: 0; padding: 40px 20px; }}
        .card {{ max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; padding: 36px 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }}
        .brand {{ font-family: Georgia, serif; font-size: 24px; font-weight: bold; color: #18181b; text-decoration: none; }}
        .heading {{ font-family: Georgia, serif; font-size: 20px; font-weight: bold; color: #18181b; margin-top: 24px; }}
        .text {{ font-size: 14px; line-height: 1.6; color: #52525b; margin: 16px 0; }}
        .button {{ display: inline-block; background-color: #18181b; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; margin: 20px 0; }}
        .footer {{ font-size: 12px; color: #a1a1aa; margin-top: 32px; border-top: 1px solid #f4f4f5; pt: 16px; }}
        .url {{ word-break: break-all; color: #71717a; font-size: 12px; }}
      </style>
    </head>
    <body>
      <div class="card">
        <a href="{settings.FRONTEND_URL}" class="brand">InkFolio</a>
        <h2 class="heading">Password Reset Request</h2>
        <p class="text">Hello {to_name or 'there'},</p>
        <p class="text">We received a request to reset your InkFolio account password. Click the button below to choose a new password. This link is valid for 1 hour.</p>
        <div style="text-align: center;">
          <a href="{reset_url}" class="button" target="_blank">Reset Password</a>
        </div>
        <p class="text">If you did not request a password reset, you can safely ignore this email.</p>
        <div class="footer">
          <p>If the button doesn't work, copy and paste this URL into your browser:</p>
          <p class="url">{reset_url}</p>
        </div>
      </div>
    </body>
    </html>
    """

    payload = {
        "sender": {
            "name": settings.BREVO_SENDER_NAME,
            "email": settings.BREVO_SENDER_EMAIL
        },
        "to": [
            {
                "email": to_email,
                "name": to_name or to_email
            }
        ],
        "subject": "Reset your InkFolio password",
        "htmlContent": html_content
    }

    if not api_key:
        print(f"[Brevo Service] BREVO_API_KEY is not set. Reset link for {to_email}: {reset_url}")
        return True

    try:
        req = urllib.request.Request(
            "https://api.brevo.com/v3/smtp/email",
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "api-key": api_key,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            return response.status in (200, 201, 202)
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="ignore")
        print(f"[Brevo Service] HTTP error sending email via Brevo: {e.code} - {error_body}")
        return False
    except Exception as e:
        print(f"[Brevo Service] Failed to send email via Brevo: {e}")
        return False
