import { apps } from '../../shared/js/apps';
import HTTP from '../../shared/react/HTTP';

export async function fetchCloudfrontDistributions() {
  try {
    const data = await HTTP.get(apps.Admin.name, `/v1/cloudfront-distributions`);

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function uploadFile({ file, bucket, path, cacheControl, cloudfrontId }) {
  try {
    const data = await HTTP.post(apps.Admin.name, `/v1/upload`, {
      file,
      bucket,
      path,
      cacheControl,
      cloudfrontId,
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function checkDomainAvailability(domainName) {
  try {
    const data = await HTTP.post(apps.Admin.name, `/v1/domains`, {
      domainName,
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
